import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';
// import { AppVersion } from '@ionic-native/app-version';
// import { AppUpdate } from '@ionic-native/app-update';

@Component({
  templateUrl: 'profileModal.html'
})
export class profileModal {
	host : any;
	employee : {nik : any, name : any, level :any, email : any, phone : any, address : any,token : any,role_desc : any};
	constructor(private nativeStorage: NativeStorage,params:NavParams, public navCtrl: NavController, public modalCtrl: ModalController, public viewCtrl: ViewController,public http : Http,public loadingCtrl : LoadingController) {
		// Get Host
		this.nativeStorage.getItem('rootHost').then( 
		data => {
			this.host = data.host;
		});
		// Initialize
		// this.employee = {nik : '2013310016',name : params.get('employee'), level : '', email : '', phone : '', address : '',token : ''};
		this.employee = {nik : params.get('nik'),name : params.get('name'), level : params.get('level'), email : params.get('email'), phone : params.get('phone'), address : params.get('address'),token : params.get('token'), role_desc : params.get('role_desc')};
	}
	dismiss() {
		this.viewCtrl.dismiss();
	}
	// 45.76.154.5/api
	// asabaapi.abilhost.com
	logout() {
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
	  	});
		loading.present();
		this.nativeStorage.remove('tokenStore').then(() => console.log('Logged out'));
		this.http.post(this.host+'LoginCtrl/allLogout/',JSON.stringify(this.employee))
  		.subscribe(data => {
        loading.dismiss();
        this.viewCtrl.dismiss();
  		});
	}

	update(){
		// const updateUrl = 'http://your-remote-api.com/update.xml';
  //  		this.appUpdate.checkAppUpdate(updateUrl);
  // 		alert('AppName: '+this.appVersion.getAppName());
		// alert('PackageName: '+this.appVersion.getPackageName());
		// alert('VerCode: '+this.appVersion.getVersionCode());
		// alert('VerNum '+this.appVersion.getVersionNumber());
	}
}