import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';

import { InputEngPp } from '../inputPp/InputEngPp';
import { InputEngOffice } from '../inputOffice/InputEngOffice';
import { CompleteEngSchedule } from '../complete/CompleteEngSchedule';

@Component({
  templateUrl: 'DetailEngSchedule.html'
})
export class DetailEngSchedule {
  selectedSchedule: any;
  nik : any;
  destination:string;
  start:string;
  host : string = 'http://54.39.167.4/thinktaskapi/rest_api/';
  load : any = this.loading.create({
    content : 'Please wait...'
  });
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,public loading : LoadingController,private http : Http, private geolocation: Geolocation, private launchNavigator: LaunchNavigator, public toastCtrl: ToastController) {
    this.selectedSchedule = navParams.get('item');
    this.nik = navParams.get('nik');
  }

  inputMeter(event,item) {
  	if (item.machineType.type === 'g-gapp') {
  		this.navCtrl.push(InputEngPp, {
      	item: item,
        nik : this.nik
    	});
  	} else if(item.machineType.type === 'g-op') {
  		this.navCtrl.push(InputEngOffice, {
      	item: item,
        nik : this.nik
    	});
  	}
  }
  taskComplete(event, item) {
    this.navCtrl.push(CompleteEngSchedule, {
      item: item,
      nik : this.nik
    });
  }
  takeTask() {
    this.load.present();
    this.http.get(this.host+'ScheduleCtrl/took/'+this.selectedSchedule.id_schedule_customer,{})
    .subscribe(data => {
      this.navCtrl.popToRoot();
      this.load.dismiss();
    },err => {
      this.load.dissmis();
      alert(err._body);
      // let errMsg = this.alertCtrl.create({
      //   title : 'Ooopppss something happen!',
      //   message : JSON.stringify(err)
      // })
      // errMsg.present();
    });
  }
  routeCust(){
    this.geolocation.getCurrentPosition({timeout:15000}).then((resp) => {
     // resp.coords.latitude
     // resp.coords.longitude
     this.start = resp.coords.latitude+','+resp.coords.longitude;
     this.destination = this.selectedSchedule.contract.gps_coordinate;

      let options: LaunchNavigatorOptions = {
        start: this.start
      };
      this.launchNavigator.navigate(this.destination, options)
        .then(
            success => console.log('Launched navigator'),
            error => alert('Error launching navigator: ' + error)
      );

    }).catch((error) => {
      alert('Error getting location'+JSON.stringify(error));
    });
  }
}
