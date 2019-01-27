import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NavController, NavParams, LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;

@Component({
  templateUrl: 'GeneralGappMeter.html'
})
export class GeneralGappMeter {
  host : any;
  selectedSchedule: any;
  nik : any;
  loading : any;
  image1: string = null;
  image2: string = null;
  image3: string = null;
  meter : {print_black : number, print_color : number, miss_copy_bw :number, print_copy_color : number, total :number}
  constructor(public navCtrl: NavController, public navParams: NavParams,public http : Http,public loadingCtrl : LoadingController,public nativeStorage : NativeStorage,public alertz : AlertController, public toastCtrl: ToastController, private camera: Camera, private file: File, private filePath: FilePath, private transfer: FileTransfer, public platform: Platform) {
    // Get Host
    this.nativeStorage.getItem('rootHost').then(
    data => {
      this.host = data.host;
    });
    // this.host = 'http://107.173.27.5/sapi_jobversand/rest_api/';
    this.selectedSchedule = navParams.get('item');
    this.nik = navParams.get('nik');
    this.initialize();
  }
  initialize() {
  	this.meter = { print_black : 0, print_color : 0, miss_copy_bw :0, print_copy_color : 0, total :0}
  }
  calc() {
    var count = Math.floor(this.meter.print_black) + Math.floor(this.meter.miss_copy_bw) + Math.floor(this.meter.print_copy_color) + Math.floor(this.meter.print_color);
    this.meter.total = count;
  }
  save() {
    if (this.image1 == null) {
      alert('Belum ada gambar/foto !');
      return false;
    }else if(this.meter.total == 0){
      alert('Meter tidak boleh kosong !');
      return false;
    }

  	this.loading = this.loadingCtrl.create({
  		content: 'Please wait...'
  	});
  	let prompt = this.alertz.create({
  		title : 'Are you sure ?',
  		buttons : [
  			{
  				text : 'No',
  				role : 'cancel',
  				handler : () => {
  					console.log('canceling input meter');
  				}
  			},{
    				text : 'Yes',
    				handler : () => {
  					this.loading.present();
  					var detailMeter =[{
  							name : 'print_black',
  							qty : this.meter.print_black
  						},{
  							name : 'print_color',
  							qty : this.meter.print_color
  						},{
  							name : 'miss_copy_bw',
  							qty : this.meter.miss_copy_bw
  						}, {
  							name : 'print_copy_color',
  							qty : this.meter.print_copy_color,
  						}, {
  							name : 'total',
  							qty : this.meter.total
  						}];
  					var sendMeter = {
  						id_contract : this.selectedSchedule.id_customer_contract,
  						banner_option : this.selectedSchedule.machineType.type,
  						nik : this.nik,
  						detail : detailMeter,
            	id_schedule_customer : this.selectedSchedule.id_schedule_customer
    				}
            // =============================================================================================
            // SINGLE UPLOAD FOTO
            // =============================================================================================
            var options = {
                fileKey: "file",
                fileName: this.image1,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params : {'image_name': this.image1, 'id_schedule_customer': this.selectedSchedule.id_schedule_customer}
            };

            var options_1 = {
                fileKey: "file",
                fileName: this.image2,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params : {'image_name': this.image2, 'id_schedule_customer': this.selectedSchedule.id_schedule_customer}
            };

            const fileTransfer: FileTransferObject = this.transfer.create();

            // // Use the FileTransfer to upload the image
            this.presentToast('Processing data...');
            this.http.post(this.host+'MeterCtrl/insertMeter/',JSON.stringify(sendMeter))
            .subscribe(data => {
              this.presentToast('Photo 1 uploading...');
              fileTransfer.upload(this.pathForImage(this.image1), this.host + 'MeterCtrl/imageMeter/', options).then((data) => {
                if (this.image2 == null) {
                  this.http.get(this.host+'MeterCtrl/updateSchedule/'+this.selectedSchedule.id_schedule_customer,{})
                  .subscribe(res => {
                    this.presentToast('Done.');
                    // alert(JSON.stringify(res));
                    this.sendMail(this.selectedSchedule.id_schedule_customer);
                    this.loading.dismiss();
                    this.initialize();
                    this.navCtrl.popToRoot();
                  }, err => {
                    alert('Error : '+JSON.stringify(err));
                  });
                }else{
                  this.presentToast('Photo 2 uploading...');
                  fileTransfer.upload(this.pathForImage(this.image2), this.host + 'MeterCtrl/imageMeter/', options_1).then((data) => {
                    this.http.get(this.host+'MeterCtrl/updateSchedule/'+this.selectedSchedule.id_schedule_customer,{})
                    .subscribe(res => {
                      this.presentToast('Done.');
                      // alert(JSON.stringify(res));
                      this.sendMail(this.selectedSchedule.id_schedule_customer);
                      this.loading.dismiss();
                      this.initialize();
                      this.navCtrl.popToRoot();
                    }, err => {
                      alert('Error : '+JSON.stringify(err));
                    });
                  }, (err) => {
                    this.loading.dismiss();
                    alert('Foto 2 cannot uploaded ! '+JSON.stringify(err));
                  });
                }
              }, (err) => {
                this.loading.dismiss();
                alert('Foto 1 cannot uploaded ! '+JSON.stringify(err));
              });
            });
  				}
  			}
  		]
  	}); // Alert
  	prompt.present();
  }

  // Camera
  pathForImage(img) {
    if (img === null) {
      return '';
    }else{
      return cordova.file.dataDirectory + img;
    }
  }

  takePicture(where) {
    // Option for camera
    var options = {
      quality: 30,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }

    // Get picture function
    this.camera.getPicture(options).then((imagePath) => {
      if (this.platform.is('android')) {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), where);
      }
    }, (err) => {
      this.presentToast('Cannot get images.');
    });
  }

  private createFileName(){
    var d = new Date(),
    n = d.getTime(),
    newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName, where) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      if (where == 1) {
        this.image1 = newFileName;
      }else if (where == 2) {
        this.image2 = newFileName;
      }else if(where == 3) {
        this.image3 = newFileName;
      }
      // this.+where = newFileName;
      // alert(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  uploadFoto(name, src, id_schedule, finish){
    // Upload Photo
    var options = {
        fileKey: "file",
        fileName: name,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'image_name': name, 'id_schedule_customer': id_schedule}
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    // // Use the FileTransfer to upload the image
    fileTransfer.upload(src, this.host + 'MeterCtrl/imageMeter/', options).then(data => {
      if (finish) {
        this.loading.dismiss();
        this.initialize();
        this.navCtrl.popToRoot();
      }
    }, err => {
      alert(JSON.stringify(err));
    });
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 5000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

  getLastMeter() {
    if (this.selectedSchedule.history == null) {
      alert('History not found !');
    }else{
      alert(JSON.stringify(this.selectedSchedule.history));
    }
  }

  // this.sendMail(this.selectedSchedule.id_schedule_customer);
  sendMail(id_schedule_customer){
    this.http.get('http://202.158.44.171/jobversand/Mailer/sendMail/'+this.selectedSchedule.id_schedule_customer,{})
    .subscribe(res => {
      console.log(res);
    });
  }
}
