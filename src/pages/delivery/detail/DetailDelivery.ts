import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  templateUrl: 'DetailDelivery.html'
})
export class DetailDelivery {
  selectedSchedule: any;
  // host : any = 'http://localhost/projects/asabaApi/rest_api/';
  host : any;
  arived : any = false;
  destination:string;
  start:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController,public http : Http,public loading : LoadingController, public nativeStorage : NativeStorage, private geolocation: Geolocation, private launchNavigator: LaunchNavigator) {
    this.selectedSchedule = navParams.get('item');
    // Get Host
    this.nativeStorage.getItem('rootHost').then( 
    data => {
      this.host = data.host;
    });
  }

  took(params) {
  	let load = this.loading.create({
	  content : 'Please Wait...'
	});
  	load.present();
	this.http.get(this.host+'DeliveryTask/tookDeliv/'+params,{})
	.subscribe(data => {
    load.dismiss();
    // this.navCtrl.pop();
    this.navCtrl.popToRoot();
  },err => {
	  load.dismiss();
	  alert(JSON.stringify(err));
	});
  }

  completed(params) {
  	let alertz = this.alertCtrl.create({
  		title : 'Are you sure ?',
  		buttons: [
	      {
	        text: 'No',
	        role: 'cancel',
	        handler: () => {}
	      },
	      {
	        text: 'Yes',
	        handler: () => {
	          let load = this.loading.create({
	          	content : 'Please Wait...'
	          });
	          load.present();
	          this.http.get(this.host+'DeliveryTask/completeDelivery/'+params,{})
      			  .subscribe(data => {
      			  	load.dismiss();
      			    // this.navCtrl.pop();
                this.navCtrl.popToRoot();
      			  },err => {
      			    load.dismiss();
                alert(JSON.stringify(err));
      			  });
	        }
	      }
	    ]
  	});
  	alertz.present();
  }
  routeCustomer(params){
    let load = this.loading.create({
      content : 'Please Wait...'
    });
    load.present();
    this.geolocation.getCurrentPosition({timeout:10000}).then((resp) => {
     // resp.coords.latitude
     // resp.coords.longitude
     this.start = resp.coords.latitude+','+resp.coords.longitude;
     this.destination = params;
     // this.destination = this.selectedTask.contract.gps_coordinate;

      let options: LaunchNavigatorOptions = {
        start: this.start
      };
      this.launchNavigator.navigate(this.destination, options)
        .then(
            success => load.dismiss(),
            error => {
              load.dismiss();
              alert('Error launching navigator: ' + JSON.stringify(error));
            }
      );

    }).catch((error) => {
      alert('Error getting location'+JSON.stringify(error));
    });
  }
}
