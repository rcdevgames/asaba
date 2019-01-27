import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { CompleteEngTask } from '../complete/CompleteEngTask';

declare var cordova: any;

@Component({
  templateUrl: 'InputEngTaskPp.html'
})
export class InputEngTaskPp {
  image1: string = null;
  image2: string = null;
  image3: string = null;
  selectedTask: any;
  input : { total_bw : number, total_color : number, total : number};
  constructor(public navCtrl: NavController, public navParams: NavParams, public alert : AlertController, public toastCtrl: ToastController, private camera: Camera, private file: File, private filePath: FilePath, private transfer: FileTransfer, public platform: Platform) {
    this.selectedTask = navParams.get('item');
    this.input = { total_bw : 0, total_color : 0, total : 0}
    if (this.selectedTask.uncomplete === 'yes') {
       this.getLastMeter();
    }
  }
  getLastMeter() {
    for (let detail of this.selectedTask.lastMeter.detail) {
     if (detail.item_name === 'total_bw') {
       this.input.total_bw = detail.item_qty;
     }
     if (detail.item_name === 'total_color') {
       this.input.total_color = detail.item_qty;
     }
     if (detail.item_name === 'total') {
       this.input.total = detail.item_qty;
     }
    }
  }

  calc() {
  	this.input.total = Math.floor(this.input.total_bw) + Math.floor(this.input.total_color);
  }

  saveMeter() {
    // if(this.input.total == 0 ){
    //   let errMsg = this.alert.create({
    //     title : 'Ooopppss something happen!',
    //     message : 'Meter tidak boleh kosong !'
    //   })
    //   errMsg.present();
    //   return false;
    // }
  	let warn = this.alert.create({
  		title : 'Are you sure ?',
  		buttons : [
  			{
  			  	text: 'No',
	          role: 'cancel',
	          handler: () => {
	            console.log('Canceling saving meter');
	          }
  			}, {
  				text : 'Yes',
  				handler: () => {
            var gambar = [{
              name : 'image1',
              src : this.image1,
              path : this.pathForImage(this.image1)
            },{
              name : 'image2',
              src : this.image2,
              path : this.pathForImage(this.image2)
            },{
              name : 'image3',
              src : this.image3,
              path : this.pathForImage(this.image3)
            }];

            var sendMeter = [{
              name : 'total_bw',
              qty : (this.input.total_bw)?this.input.total_bw:0
            },{
              name : 'total_color',
              qty : (this.input.total_color)?this.input.total_color:0
            },{
              name : 'total',
              qty : (this.input.total)?this.input.total:0
            }];
            // console.log(JSON.stringify(sendMeter));
						this.navCtrl.push(CompleteEngTask, {
			        item: this.selectedTask,
			        input: sendMeter,
              image: gambar
			      });
       //      if (this.input.total_bw != 0 || this.input.total_color != 0) {
  					// }
  				}
  			}
  		] // Buttons
  	}); // alert create
  	warn.present();
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    }else{
      console.log(cordova.file.dataDirectory + img);
      return cordova.file.dataDirectory + img;
    }
  }

  takePicture(where) {
    console.log(where);
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
      console.log(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 5000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
