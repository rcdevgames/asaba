import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Events, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';

import { HomePage } from '../home/home';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
  host : any;
	accessToken : any;
  login : {nik : string, password: string};
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,private nativeStorage: NativeStorage,public http : Http,public loadingCtrl : LoadingController, public events : Events, public plt: Platform) {
    // Get Host
    this.host = 'http://202.158.44.171/asabaApi/rest_api/';
    // Initalize
    this.login = { nik : '', password : '' };
    let toast = this.toastCtrl.create({
      message: 'Unauthorized, please log in first!',
      duration: 5000,
      showCloseButton: true,
		  closeButtonText: 'Ok'
    });
    toast.present();
  }
  generateToken(params) {
		this.nativeStorage.setItem('tokenStore', {'sessionToken' : params.session,'previlage' : params.previlage, 'employee' : params.data})
		.then(dataToken => {
			this.accessToken = dataToken;
		},
		error => console.error('Error storing token', error));

    // Events
    this.events.publish('user:created', params.data.role, Date.now());
	}
  doLogin() {
  	if (this.login.nik === '' || this.login.password === '') {
  		let toast = this.toastCtrl.create({
	      message: 'nik and password cannot be null',
	      duration: 5000,
	      showCloseButton: true,
			  closeButtonText: 'Ok'
	    });
      toast.present();
  	} else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  		loading.present();
  		this.http.post(this.host+'LoginCtrl/employeeLogin/',JSON.stringify(this.login))
  		.subscribe(data => {
        loading.dismiss();
  			this.generateToken(data.json());
		  	this.navCtrl.setRoot(HomePage);
  		},err => {
        console.log(JSON.stringify(err));
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Ooopssss, NIK and password are invalid',
          duration: 5000,
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();
      });
  	}
  }
}
