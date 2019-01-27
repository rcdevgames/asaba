import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController, Events } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';

import { InputEngTaskPp } from '../inputTaskPp/InputEngTaskPp';
import { InputEngTaskOffice } from '../inputTaskOffice/InputEngTaskOffice';
import { CompleteEngTask } from '../complete/CompleteEngTask';
import { ListHistoryEng } from '../../history/detail/ListHistoryEng';

@Component({
  templateUrl: 'DetailEngTask.html'
})
export class DetailEngTask {
  selectedTask: any;
  status : any;
  host : any;
  arived : any = false;
  destination:string;
  start:string;
  jarak:any = 0;
  // canArrive:any = true;
  load : any = this.loading.create({
    content : 'Please wait...'
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,public loading : LoadingController,private http : Http,public nativeStorage : NativeStorage, private geolocation: Geolocation, private launchNavigator: LaunchNavigator, public toastCtrl: ToastController, public events : Events) {
    this.selectedTask = navParams.get('item');
    console.log(this.selectedTask.contract.gps_coordinate);
    this.status = this.selectedTask.status;
    console.log(this.status);
    // Get Host
    this.nativeStorage.getItem('rootHost').then( 
    data => {
      this.host = data.host;
    });
    // this.load.present();

    // // Watch Position
    // let watch = this.geolocation.watchPosition();
    // watch.subscribe((data)=>{
    //   // this.canArrive = false;
    //   // this.load.dismiss();
    //   var lat = this.selectedTask.contract.gps_coordinate.substr(0, this.selectedTask.contract.gps_coordinate.indexOf(','));
    //   var long = this.selectedTask.contract.gps_coordinate.substr(this.selectedTask.contract.gps_coordinate.indexOf(',') + 1);
    //   // this.jarak = this.calcCrow(data.coords.latitude, data.coords.longitude, lat, long);
    //   // alert(data.coords.latitude+' - '+data.coords.longitude);
    //   if (data.coords.latitude && data.coords.longitude) {
    //     if (this.calcCrow(data.coords.latitude, data.coords.longitude, lat, long)) {
    //       // if (this.arived == false) alert('Kamu sudah sampai');
    //       this.arived = true;
    //     }else{
    //       this.arived = false;
    //     }
    //   }
    // });

    events.subscribe('location:created', (location, time) => {
      // alert(JSON.stringify(location));
      if (location && time) {
        var lat = this.selectedTask.contract.gps_coordinate.substr(0, this.selectedTask.contract.gps_coordinate.indexOf(','));
        var long = this.selectedTask.contract.gps_coordinate.substr(this.selectedTask.contract.gps_coordinate.indexOf(',') + 1);
        if (this.calcCrow(location.latitude, location.longitude, lat, long)) {
          // if (this.arived == false) alert('Kamu sudah sampai');
          this.arived = true;
        }else{
          this.arived = false;
        }
      }
    });
  }
  // Push To Meter History
  meterHistory() {
    this.navCtrl.push(ListHistoryEng, {
      item: this.selectedTask.history
    });
  }
  // Action
  cancelProcess() {
    let alert = this.alertCtrl.create({
      title : 'Are you sure ?',
      buttons : [{
        text : 'No',
        role : 'cancel',
        handler:()=>  {
          console.log('Canceling cancel process');
        }
      },{
        text : 'Yes',
        handler:()=>  {
          this.http.get(this.host+'EngineerCtrl/revertTask/'+this.selectedTask.id_trouble+'/'+this.selectedTask.assign_task,{})
          .subscribe(data => {
            this.status = 'assigned';
            this.navCtrl.popToRoot();
          },err => {
            console.log(err);
          });
        }
      }]
    })
    alert.present();
  }
  takeTask() {
    this.load.present();
    this.http.get(this.host+'EngineerCtrl/changeStatus/'+this.selectedTask.id_trouble+'/took',{})
      .subscribe(data => {
        this.status = 'took';
        this.navCtrl.popToRoot();
        this.load.dismiss();
      },err => {
        let errMsg = this.alertCtrl.create({
          title : 'Ooopppss something happen!',
          message : err
        })
        errMsg.present();
      });
  }
  arrived() {
    // var lokasi = this.jarak.toString();
    // var message = '';
    // if (!this.arived) { 
    //   // alert('Jarak anda dengan customer '+this.jarak+' (KM)'); 
    //   message = 'Jarak anda dengan customer '+lokasi.substr(0, lokasi.indexOf('.'))+' (KM), anda yakin ingin tetap lakukan konfirmasi sampai?'
    // }else{
    //   message = 'Anda sudah sampai di lokasi customer :)'
    // }
    let alerts = this.alertCtrl.create({
      title: 'Arrived Confirmation',
      // message: message,
      message: 'Apakah anda sudah sampai di lokasi customer?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Canceling arriving');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.load.present();
            this.http.get(this.host+'EngineerCtrl/changeStatus/'+this.selectedTask.id_trouble+'/arrived?location='+this.jarak,{})
            .subscribe(data => {
              this.load.dismiss();
              this.status = 'arrived';
              this.navCtrl.popToRoot();
            },err => {
              console.log(err);
            });
          }
        }
      ]
    });
    alerts.present();
  }
  inputMeter() {
    if (this.selectedTask.machineType.type === 'g-gapp') {
      this.navCtrl.push(InputEngTaskPp, {
        item: this.selectedTask
      });
    } else if(this.selectedTask.machineType.type === 'g-op') {
      this.navCtrl.push(InputEngTaskOffice, {
        item: this.selectedTask
      });
    }
  }
  completeTask() {
    this.navCtrl.push(CompleteEngTask, {
      item: this.selectedTask,
      input : 'false'
    });
  }
  routeCustomer(){
    this.load.present();
    this.geolocation.getCurrentPosition({timeout:10000}).then((resp) => {
     // resp.coords.latitude
     // resp.coords.longitude
     this.start = resp.coords.latitude+','+resp.coords.longitude;
     this.destination = this.selectedTask.contract.gps_coordinate;

      let options: LaunchNavigatorOptions = {
        start: this.start
      };
      this.launchNavigator.navigate(this.destination, options)
        .then(
            success => this.load.dismiss(),
            error => {
              this.load.dismiss();
              alert('Error launching navigator: ' + error);
            }
      );

    }).catch((error) => {
      alert('Error getting location'+error);
    });
  }
  calcCrow(lat1, lon1, lat2, lon2){
    var R = 6371; // KM
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    this.jarak = d;
    // return d;
    // console.log(d);
    if (d < 0.6) {
      return true;
    }
    return false;
  }
  toRad(Value){
    return Value * Math.PI / 180;
  }
}
