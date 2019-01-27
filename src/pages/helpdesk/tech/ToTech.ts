import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController  } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'ToTech.html'
})
export class ToTech {
  selectedItem: any;
  nik : any;
  host : any;
  dataTech : any;
  singleTech : any;
  selectedTech : number;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,public loading : LoadingController, public http : Http,public nativeStorage : NativeStorage) {
  	// Get Host
    this.nativeStorage.getItem('rootHost').then( 
    data => {
      this.host = data.host;
   //    this.http.get(data.host+'HelpdeskCtrl/listingTech/',{})
	  // .subscribe(data => {
	  // 	this.dataTech = data.json();
	  // },err => {
	  //  	console.log(err);
	  // });
    });
    this.selectedItem = navParams.get('item');
    this.nik = navParams.get('nik');
    this.dataTech = this.selectedItem.allEngineer;
    this.singleTech = this.selectedItem.areaEngineer;
    this.selectedTech = this.singleTech.nik;
    // console.log(this.selectedItem);
  }
  confirmation() {
  	let alertz = this.alertCtrl.create({
	    title: 'Assign to technician',
	    message: 'Apakah anda akan assign task ini ke teknisi?',
	    buttons: [
	      {
	        text: 'No',
	        role: 'cancel',
	        handler: () => {
	          console.log('Canceling assigning');
	        }
	      },
	      {
	        text: 'Yes',
	        handler: () => {
	        	let load = this.loading.create({
	        		content : 'Please wait...'
	        	});
	        	load.present();
	        	if (this.selectedTech != 0) {
	        		this.http.get(this.host+'HelpdeskCtrl/assignTech/'+this.selectedItem.id_trouble+'/'+this.selectedTech+'/'+this.nik,{})
					  .subscribe(data => {
					  	load.dismiss();
					  	this.navCtrl.popToRoot();
					  },err => {
					   	alert(JSON.stringify(err));
					  });
	        	} else {
	        		load.dismiss();
	        	}
	        }
	      }
	    ]
	  });
	  alertz.present();
  }
}
