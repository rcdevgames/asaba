import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http  } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'CompleteEngTask.html'
})
export class CompleteEngTask {
  selectedSchedule: any;
  complete : {status : any, status_desc :any, id_trouble : any};
  inputMeter : {id_trouble : any, nik : any, id_contract : any, detailInput : any};
  gambar : any = [];
  host : any;
  load : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loading : LoadingController, private http : Http,private nativeStorage: NativeStorage, private file: File, private filePath: FilePath, private transfer: FileTransfer) {
    this.selectedSchedule = navParams.get('item');
    this.inputMeter = navParams.get('input');
    this.gambar = navParams.get('image');
    // Get Host
    this.nativeStorage.getItem('rootHost').then(
    data => {
      this.host = data.host;
    });
    // Original
    this.complete = { status : 'completed', status_desc : '', id_trouble : this.selectedSchedule.id_trouble};
    this.nativeStorage.getItem('tokenStore').then(
  		data => {
  			this.inputMeter = {id_trouble : this.selectedSchedule.id_trouble, nik : data.employee.nik, id_contract : this.selectedSchedule.contract.id_contract, detailInput : this.inputMeter}
  		},
  		error => {console.error('Error getting token', error);}
	  );
  }

  setComplete() {
  	this.load = this.loading.create({
  		content : 'Please wait...'
  	});
  	this.load.present();
  	if (this.complete.status === 0) {
  		this.load.dismiss();
  	} else {
    //=========================================================================================================================
    //  Single Foto
    //=========================================================================================================================
      // this.http.post(this.host+'EngineerCtrl/inputMeter/',JSON.stringify(this.inputMeter))
      // .subscribe(data => {
      //   this.http.post(this.host+'EngineerCtrl/completeTask/',JSON.stringify(this.complete))
      //   .subscribe(data => {
      //     if (this.gambar[1].src == null) {
      //       this.uploadFoto(this.gambar[0].src, this.gambar[0].path, this.selectedSchedule.id_trouble, true);
      //     }else if(this.gambar[2].src == null){
      //       this.uploadFoto(this.gambar[0].src, this.gambar[0].path, this.selectedSchedule.id_trouble, false);
      //       this.uploadFoto(this.gambar[1].src, this.gambar[1].path, this.selectedSchedule.id_trouble, true);
      //     }else if (this.gambar[1].src != null && this.gambar[2].src != null){
      //       this.uploadFoto(this.gambar[0].src, this.gambar[0].path, this.selectedSchedule.id_trouble, false);
      //       this.uploadFoto(this.gambar[1].src, this.gambar[1].path, this.selectedSchedule.id_trouble, false);
      //       this.uploadFoto(this.gambar[2].src, this.gambar[2].path, this.selectedSchedule.id_trouble, true);
      //     }else{
      //       alert("Error Upload Photos");
      //       this.load.dismiss();
      //     }
      //   }); // Done complete task
      // }); // Done input Meter
    //=========================================================================================================================
    //  Single Foto
    //=========================================================================================================================
      this.http.post(this.host+'EngineerCtrl/inputMeter/',JSON.stringify(this.inputMeter))
      .subscribe(data => {
        this.http.post(this.host+'EngineerCtrl/completeTask/',JSON.stringify(this.complete))
        .subscribe(data => {
            // Upload Photo
            if (this.gambar[0].src == null) {
              this.load.dismiss();
              this.navCtrl.popToRoot();
            }else{
              var options = {
                  fileKey: "file",
                  fileName: this.gambar[0].src,
                  chunkedMode: false,
                  mimeType: "multipart/form-data",
                  params : {'image_name': this.gambar[0].src, 'id_trouble': this.selectedSchedule.id_trouble}
              };

              const fileTransfer: FileTransferObject = this.transfer.create();

              // Use the FileTransfer to upload the image
              fileTransfer.upload(this.gambar[0].path, this.host + 'EngineerCtrl/imageMeter/', options).then(data => {
                  // load.dismissAllΩ();
                this.load.dismiss();
                this.navCtrl.popToRoot();
              }, err => {
                this.load.dismiss();
                alert('Error while uploading file.');
              });
            }
        }); // Done complete task
      }); // Done input Meter
    //=========================================================================================================================
  	}
  }

  uploadFoto(name, src, trouble, finish){
    // Upload Photo
    var options = {
        fileKey: "file",
        fileName: name,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'image_name': name, 'id_trouble': trouble}
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    // // Use the FileTransfer to upload the image
    fileTransfer.upload(src, this.host + 'EngineerCtrl/imageMeter/', options).then(data => {
      if (finish) {
        this.load.dismiss();
        this.navCtrl.popToRoot();
      }
    });
  }
}
