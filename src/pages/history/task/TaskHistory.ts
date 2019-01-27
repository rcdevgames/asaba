import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, NavParams, AlertController, LoadingController,ModalController, ActionSheetController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';

import { profileModal } from '../../home/profileModal';
import { DetailHistoryEng } from '../../engineer/history/detail/DetailHistoryEng';
import { DetailHistoryDelivery } from '../../delivery/history/DetailHistoryDelivery';
import { DetailHelpdesk } from '../../helpdesk/detail/DetailHelpdesk';
import { LoginPage } from '../../login/login';

@Component({
  templateUrl: 'TaskHistory.html'
})
export class TaskHistory {
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
        this.generateEngTask(data.host);
      } else if(this.previlage === 'DLV') {
        this.generateDeliveryTask(data.host);
      } else if(this.previlage === 'SPV' || this.previlage === 'helpdesk' || this.previlage == 'CC') {
        this.generateHelpdeskTask(data.host);
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

  generateEngTask(host) {
    this.http.get(host+'HistoryCtrl/listingTaskEngineer/'+this.nik,{})
    .subscribe(data => {
      this.dataHistory = data.json();
      this.load.dismiss();
    },err => {
      // let errMsg = this.alertCtrl.create({
      //   title : 'Ooopppss something happen!',
      //   message : err
      // })
      // errMsg.present();
      alert(JSON.stringify(err));
    });
  }
  generateDeliveryTask(host) {
    this.http.get(host+'HistoryCtrl/listingTaskDelivery/'+this.nik,{})
    .subscribe(data => {
      this.dataHistory = data.json();
      this.load.dismiss();
    },err => {
      // let errMsg = this.alertCtrl.create({
      //   title : 'Ooopppss something happen!',
      //   message : err
      // })
      // errMsg.present();
      alert(JSON.stringify(err));
    });
  }
  generateHelpdeskTask(host) {
    this.http.get(host+'HistoryCtrl/listingTaskHelpdesk/'+this.nik,{})
    .subscribe(data => {
      this.dataHistory = data.json();
      this.load.dismiss();
    },err => {
      // let errMsg = this.alertCtrl.create({
      //   title : 'Ooopppss something happen!',
      //   message : err
      // })
      // errMsg.present();
      alert(JSON.stringify(err));
    });
  }

  selectHistory(data) {
    if (this.previlage === 'SE') {
      this.navCtrl.push(DetailHistoryEng, {
        item: data
      });
    } else if(this.previlage === 'DLV') {
      this.navCtrl.push(DetailHistoryDelivery, {
        item: data
      });
    } else if(this.previlage === 'helpdesk' || this.previlage === 'SPV' || this.previlage === 'CC') {
       this.navCtrl.push(DetailHelpdesk, {
        item: data,
        history : 1
      });
    }
  }

  // Profile Modal
  openProfileModal(){
    let modal = this.modalCtrl.create(profileModal, { nik : this.employee.nik, name : this.employee.employee_name,level : this.employee.role, role_desc : this.employee.role_desc, email : this.employee.employee_email, phone : this.employee.employee_phone, address : this.employee.employee_address});
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
