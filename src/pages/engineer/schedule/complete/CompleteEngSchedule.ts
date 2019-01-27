import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http  } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'CompleteEngSchedule.html'
})
export class CompleteEngSchedule {
  selectedSchedule: any;
  complete : {status : any, status_desc :any,id_schedule_customer : any};
  inputMeter : {nik : any, id_contract : any, detailInput : any,id_schedule_customer : any};
  gambar : any = [];
  host : any;
  load : any;
  nik : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loading : LoadingController, private http : Http,private nativeStorage: NativeStorage,  private file: File, private filePath: FilePath, private transfer: FileTransfer) {
    this.selectedSchedule = navParams.get('item');
    this.inputMeter = navParams.get('input');
    this.gambar = navParams.get('image');
    this.nik = navParams.get('nik');
    // Get Host
    this.nativeStorage.getItem('rootHost').then(
    data => {
      this.host = data.host;
    });
    // Original
    this.complete = { status : 'complete', status_desc : '',id_schedule_customer : this.selectedSchedule.id_schedule_customer};
		this.inputMeter = {nik : this.nik, id_contract : this.selectedSchedule.id_customer_contract, detailInput : this.inputMeter, id_schedule_customer : this.selectedSchedule.id_schedule_customer}
   //  this.nativeStorage.getItem('tokenStore').then(
   //    data => {
			// },
			// error => {console.error('Error getting token', error);}
	  // );
  }

  setComplete() {
  	let load = this.loading.create({
  		content : 'Please wait...'
  	});
  	load.present();
  	if (this.complete.status === 0) {
  		load.dismiss();
  	} else {
      this.http.post(this.host+'ScheduleCtrl/inputMeter', JSON.stringify(this.inputMeter))
      .subscribe(data => {
        if (this.gambar[0].src != null) {
          var options = {
              fileKey: "file",
              fileName: this.gambar[0].src,
              chunkedMode: false,
              mimeType: "multipart/form-data",
              params : {'image_name': this.gambar[0].src, 'id_schedule_customer': this.selectedSchedule.id_schedule_customer}
          };

          const fileTransfer: FileTransferObject = this.transfer.create();

          // Use the FileTransfer to upload the image
          fileTransfer.upload(this.gambar[0].path, this.host + 'EngineerCtrl/imageMeter/', options).then(data => {
            this.http.post(this.host+'ScheduleCtrl/completeSchedule',JSON.stringify(this.complete))
            .subscribe(res => {
              load.dismiss();
              this.navCtrl.popToRoot();
            });
          }, err => {
            this.load.dismiss();
            alert('Error while uploading file.');
          });
        }else{
          this.http.post(this.host+'ScheduleCtrl/completeSchedule',JSON.stringify(this.complete))
          .subscribe(res => {
            load.dismiss();
            this.navCtrl.popToRoot();
          }, err => {
            alert(JSON.stringify(err));
          });
        }
  		}, err => {
        alert(JSON.stringify(err));
      });
	  }
	}
}
