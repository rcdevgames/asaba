import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController,ModalController, ActionSheetController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';

import { profileModal } from '../../home/profileModal';
import { DetailScheduleHistory } from '../../engineer/history/schedule/DetailScheduleHistory';
import { LoginPage } from '../../login/login';

@Component({
  templateUrl: 'ScheduleHistory.html'
})
export class ScheduleHistory {
  dataHistory: any;
  nik : any;
  previlage : any;
  employee : any;
  load :any = this.loading.create({
    content : 'Please wait...'
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,private nativeStorage : NativeStorage, private http : Http,public alertCtrl : AlertController, public loading : LoadingController,public modalCtrl: ModalController,public actionSheetCtrl: ActionSheetController) {
    // Get NIK
    this.nativeStorage.getItem('tokenStore').then( 
    data => {
      this.nik = data.employee.nik;
      this.previlage = data.employee.role;
      this.employee = data.employee;
    });
    // Get Host
    this.load.present();
    this.nativeStorage.getItem('rootHost').then( 
    data => {
      if (this.previlage === 'SE') {
        this.generateEngSchedule(data.host);
      } else if(this.previlage === 'MTR') {
        this.generateMeterSchedule(data.host);
      } else {
        this.load.dismiss();
      }
    });
    // Initialize
  }
  
  initialize() {
    this.nativeStorage.getItem('tokenStore').then( 
      data => {
        
      }, 
      error => {
        this.navCtrl.setRoot(LoginPage);
        console.error('Error getting token', error);
      }
    );
  }

  generateEngSchedule(host) {
    this.http.get(host+'HistoryCtrl/listingScheduleEngineer/'+this.nik,{})
    .subscribe(data => {
      this.dataHistory = data.json();
      this.load.dismiss();
    },err => {
      let errMsg = this.alertCtrl.create({
        title : 'Ooopppss something happen!',
        message : err
      })
      errMsg.present();
    });
  }
  generateMeterSchedule(host) {
    this.http.get(host+'HistoryCtrl/listingScheduleMeterReader/'+this.nik,{})
    .subscribe(data => {
      this.dataHistory = data.json();
      this.load.dismiss();
    },err => {
      let errMsg = this.alertCtrl.create({
        title : 'Ooopppss something happen!',
        message : err
      })
      errMsg.present();
    });
  }
  selectHistory(data) {
    if (this.previlage === 'SE') {
      this.navCtrl.push(DetailScheduleHistory, {
        item: data
      });
    } else if(this.previlage === 'MTR') {
      this.navCtrl.push(DetailScheduleHistory, {
        item: data
      });
    }
  }

  // Profile Modal
  openProfileModal(){
    let modal = this.modalCtrl.create(profileModal, { nik : this.employee.nik, name : this.employee.employee_name,level : this.employee.role,role_desc : this.employee.role_desc, email : this.employee.employee_email, phone : this.employee.employee_phone, address : this.employee.employee_address});
    modal.onDidDismiss(() => {
      this.initialize();
    });
    modal.present();
  }

  // Action sheet
  // Notification
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Your Notification',
      buttons: [
        {
          text: 'Anda mendapatkan task baru',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Terdapat trouble di PT. Angkasa Jaya',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'Reminder : Maintenance PT. ABC 2 days left',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
