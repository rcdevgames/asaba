import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, ModalController, ActionSheetController, ToastController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { OneSignal } from '@ionic-native/onesignal';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { LoginPage } from '../login/login';
import { profileModal } from './profileModal';
import { MeterDetail } from '../meter_reader/detail/MeterDetail';
import { DetailDelivery } from '../delivery/detail/DetailDelivery';
import { DetailHelpdesk } from '../helpdesk/detail/DetailHelpdesk';
import { DetailEngSchedule } from '../engineer/schedule/detail/DetailEngSchedule';
import { DetailEngTask } from '../engineer/task/detail/DetailEngTask';
import { ListGeneral } from '../dashboard/general_info/ListGeneral';
import { ReportingPersonal } from '../dashboard/reporting_personal/ReportingPersonal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  host : any = 'http://202.158.44.171/asabaApi/rest_api/';
	accessToken : any;
	previlage : any = 'SE';
	employee : any;
  tabsmanager : string = 'dashboard';
  thisPrevilage : any = 'SE';
  nik : any;
  dataDashboard : { mif : any; customer_call : any; reporting_personal : any; general_info : any; smart : any,count_general_info : any,delivery_job : any,pm : any, customer_request : any,cawf : any, moreTwo : any};
  // dataDashboard : any;
  dataTask : any;
  dupDataTask : any;
  dataSchedule : any;
  dupDataSchedule : any;
  dataLoaded : number = 0;
  loading : any;
  init : {nik : any, deviceToken : any};
	constructor(private nativeStorage: NativeStorage, public navCtrl : NavController,public modalCtrl: ModalController,public actionSheetCtrl: ActionSheetController,public http : Http,public alertCtrl : AlertController, public toastCtrl: ToastController, public loadingCtrl : LoadingController, public plt: Platform, public oneSignal : OneSignal, private iab: InAppBrowser) {
    // Set host
    this.nativeStorage.setItem('rootHost', {'host' : this.host })
    .then(dataToken => {});
    // Initialize
    this.dataDashboard = { mif : 0, customer_call : 0, reporting_personal : 0, general_info : 0, smart : 0,count_general_info : 0, delivery_job : 0, pm : 0, customer_request: 0, cawf : 0, moreTwo : 0}
    // if (this.platform.is('android')) {}
    // this.plt.ready().then((readySource) => {
    //   this.initialize();
    //   // console.log('Platform ready from', readySource);
    //   // Platform now ready, execute any required native code
    // });

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
	} // Construct
  ionViewDidEnter() {
    // this.initialize();
    this.plt.ready().then((readySource) => {
    //   // Platform now ready, execute any required native code
      this.initialize();
    });
  }

  // For Delivery
  generateTaskDelivery(paramsNik) {
    this.http.get(this.host+'DeliveryTask/getDeliveryListing/'+paramsNik,{})
      .subscribe(data => {
        this.dataLoaded = this.dataLoaded + 1;
        this.dataTask = data.json();
        this.dupDataTask = data.json();
        if (this.dataLoaded == 2) {
          this.loading.dismiss();
        }
      },err => {
        // let errMsg = this.alertCtrl.create({
        //   title : 'Ooopppss something happen!',
        //   message : err
        // })
        // errMsg.present();
        if (err.status == 0 && err.type == 3) {
          alert('Bermasalah dengan jaringan, silahkan keluar aplikasi dan coba lagi.');
        }else{
          alert(JSON.stringify(err));
        }
      });
  }
  // For Helpdesk
  generateTaskHelpdesk(paramsNik) {
    this.http.get(this.host+'HelpdeskCtrl/listing/'+paramsNik,{})
      .subscribe(data => {
        this.dataLoaded = this.dataLoaded + 1;
        this.dataTask = data.json();
        this.dupDataTask = data.json();
        if (this.dataLoaded == 2) {
          this.loading.dismiss();
        }
      },err => {
        // let errMsg = this.alertCtrl.create({
        //   title : 'Ooopppss something happen!',
        //   message : err
        // })
        // errMsg.present();
        if (err.status == 0 && err.type == 3) {
          alert('Bermasalah dengan jaringan, silahkan keluar aplikasi dan coba lagi.');
        }else{
          alert(JSON.stringify(err));
        }
      });
  }
  // For Engineer
  generateTaskEngineer(paramsNik) {
    this.http.get(this.host+'EngineerCtrl/listing/'+paramsNik,{})
      .subscribe(data => {
        this.dataLoaded = this.dataLoaded + 1;
          this.dataTask = data.json();
          this.dupDataTask = data.json();
          if (this.dataLoaded == 2) {
            this.loading.dismiss();
          }
      },err => {
        // let errMsg = this.alertCtrl.create({
        //   title : 'Ooopppss something happen!',
        //   message : err
        // })
        // errMsg.present();
        if (err.status == 0 && err.type == 3) {
          alert('Bermasalah dengan jaringan, silahkan keluar aplikasi dan coba lagi.');
        }else{
          alert(JSON.stringify(err));
        }
      });
  }
  generateScheduleEngineer(paramsNik) {
    this.http.get(this.host+'ScheduleCtrl/listing/engineer/'+paramsNik,{})
      .subscribe(data => {
        this.dataLoaded = this.dataLoaded + 1;
        this.dataSchedule = data.json();
        this.dupDataSchedule = data.json();
        if (this.dataLoaded == 2) {
          this.loading.dismiss();
        }
      },err => {
        // let errMsg = this.alertCtrl.create({
        //   title : 'Ooopppss something happen!',
        //   message : err
        // })
        // errMsg.present();
        if (err.status == 0 && err.type == 3) {
          alert('Bermasalah dengan jaringan, silahkan keluar aplikasi dan coba lagi.');
        }else{
          alert(JSON.stringify(err));
        }
      });
  }

  // For Meter Reader
  generateScheduleMeter(paramsNik) {
    this.http.get(this.host+'MeterCtrl/listing/meter_reader/'+paramsNik,{})
      .subscribe(data => {
        this.dataLoaded = this.dataLoaded + 1;
        this.dataSchedule = data.json();
        this.dupDataSchedule = data.json();
        if (this.dataLoaded == 2) {
          this.loading.dismiss();
        }
      },err => {
        // let errMsg = this.alertCtrl.create({
        //   title : 'Ooopppss something happen!',
        //   message : err
        // })
        // errMsg.present();
        if (err.status == 0 && err.type == 3) {
          alert('Bermasalah dengan jaringan, silahkan keluar aplikasi dan coba lagi.');
        }else{
          alert(JSON.stringify(err));
        }
      });
  }

  // Dashboard
  generateDashboardEngineer(paramsNik) {
    this.http.get(this.host+'DashboardCtrl/dashboardEngineer/'+paramsNik,{})
      .subscribe(data => {
        this.dataLoaded = this.dataLoaded + 1;
        let callBack = data.json();
        this.dataDashboard.mif = callBack.mif;
        this.dataDashboard.customer_call = callBack.customer_call;
        this.dataDashboard.count_general_info = callBack.count_general_info;
        this.dataDashboard.general_info = callBack.general_info;
        this.dataDashboard.pm = callBack.pm;
        this.dataDashboard.customer_request = callBack.customer_request;
        this.dataDashboard.cawf = callBack.cawf;
        this.dataDashboard.moreTwo = callBack.moreTwo;
        if (this.dataLoaded == 2) {
          this.loading.dismiss();
        }
      },err => {
        // let errMsg = this.alertCtrl.create({
        //   title : 'Ooopppss something happen!',
        //   message : err
        // })
        // errMsg.present();
        if (err.status == 0 && err.type == 3) {
          alert('Bermasalah dengan jaringan, silahkan keluar aplikasi dan coba lagi.');
        }else{
          alert(JSON.stringify(err));
        }
      });
  }
  generateDashboardDelivery(paramsNik) {
    this.http.get(this.host+'DashboardCtrl/dashboardDelivery/'+paramsNik,{})
    .subscribe(data => {
      this.dataLoaded = this.dataLoaded + 1;
      let callBack = data.json();
      this.dataDashboard.delivery_job = callBack.delivery_job;
      this.dataDashboard.count_general_info = callBack.count_general_info;
      this.dataDashboard.general_info = callBack.general_info;
      if (this.dataLoaded == 2) {
        this.loading.dismiss();
      }
    },err => {
      // let errMsg = this.alertCtrl.create({
      //   title : 'Ooopppss something happen!',
      //   message : err
      // })
      // errMsg.present();
      if (err.status == 0 && err.type == 3) {
        alert('Bermasalah dengan jaringan, silahkan keluar aplikasi dan coba lagi.');
      }else{
        alert(JSON.stringify(err));
      }
    });
  }
  generateDashboardHelpdesk(paramsNik) {
    this.http.get(this.host+'DashboardCtrl/dashboardHelpdesk/'+paramsNik,{})
    .subscribe(data => {
      this.dataLoaded = this.dataLoaded + 1;
      let callBack = data.json();
      this.dataDashboard.mif = callBack.mif;
      this.dataDashboard.customer_call = callBack.customer_call;
      this.dataDashboard.count_general_info = callBack.count_general_info;
      this.dataDashboard.general_info = callBack.general_info;
      if (this.dataLoaded == 2) {
        this.loading.dismiss();
      }
    },err => {
      // let errMsg = this.alertCtrl.create({
      //   title : 'Ooopppss something happen!',
      //   message : err
      // })
      // errMsg.present();
      if (err.status == 0 && err.type == 3) {
        alert('Bermasalah dengan jaringan, silahkan keluar aplikasi dan coba lagi.');
      }else{
        alert(JSON.stringify(err));
      }
    });
  }
  generateDashboardCollect(paramsNik) {
    this.http.get(this.host+'DashboardCtrl/dashboardCollect/'+paramsNik,{})
    .subscribe(data => {
      this.dataLoaded = this.dataLoaded + 1;
      let callBack = data.json();
      this.dataDashboard.mif = callBack.mif;
      this.dataDashboard.count_general_info = callBack.count_general_info;
      this.dataDashboard.general_info = callBack.general_info;
      if (this.dataLoaded == 2) {
        this.loading.dismiss();
      }
    },err => {
      // let errMsg = this.alertCtrl.create({
      //   title : 'Ooopppss something happen!',
      //   message : err
      // })
      // errMsg.present();
      if (err.status == 0 && err.type == 3) {
        alert('Bermasalah dengan jaringan, silahkan keluar aplikasi dan coba lagi.');
      }else{
        alert(JSON.stringify(err));
      }
    });
  }

	// Initialize session
	initialize() {
    // this.loading.present();
    this.nativeStorage.getItem('tokenStore').then( 
      data => {
        // console.log(JSON.stringify(data));
        if (data) {
          this.nik = data.employee.nik;
          this.accessToken = data.sessionToken;
          this.previlage = data.employee.role;
          this.employee = data.employee;
          this.thisPrevilage = data.employee.role;
        }
        if (data.employee.role === 'DLV') {
          this.generateTaskDelivery(data.employee.nik);
          this.generateDashboardDelivery(data.employee.nik);
        } else if(data.employee.role === 'CC' || data.employee.role === 'helpdesk' || data.employee.role === 'SPV') {
          // this.loading.present();
          this.generateTaskHelpdesk(data.employee.nik);
          this.generateDashboardHelpdesk(data.employee.nik);
        } else if(data.employee.role === 'SE') {
          // this.loading.present();
          this.generateDashboardEngineer(data.employee.nik);
          this.generateTaskEngineer(data.employee.nik);
          this.generateScheduleEngineer(data.employee.nik);
        } else if(data.employee.role === 'MTR') {
          // this.loading.present();
          this.generateScheduleMeter(data.employee.nik);
          this.generateDashboardCollect(data.employee.nik);
        }

        // // One Signal
        // // this.oneSignal.startInit("969f1aba-c431-4568-8ee7-0dcc246d07c9","717638893268");
        this.oneSignal.startInit("b791bae1-f87c-4c76-bf76-283704f98bab","802210781517");

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);


        this.oneSignal.getIds().then((token) => {
            this.init = {
              nik: this.nik,
              deviceToken : token.userId
            }
            this.storetoken();
        });

        this.oneSignal.handleNotificationReceived().subscribe((jeson) => {
          if (data.employee.role === 'DLV') {
            this.generateTaskDelivery(data.employee.nik);
            this.generateDashboardDelivery(data.employee.nik);
          } else if(data.employee.role === 'CC' || data.employee.role === 'helpdesk' || data.employee.role === 'SPV') {
            this.generateTaskHelpdesk(data.employee.nik);
            this.generateDashboardHelpdesk(data.employee.nik);
          } else if(data.employee.role === 'SE') {
            this.generateDashboardEngineer(data.employee.nik);
            this.generateTaskEngineer(data.employee.nik);
            this.generateScheduleEngineer(data.employee.nik);
          } else if(data.employee.role === 'MTR') {
            this.generateScheduleMeter(data.employee.nik);
            this.generateDashboardCollect(data.employee.nik);
          }
        });

        this.oneSignal.endInit();
		},error => {
        this.loading.dismiss();
				this.navCtrl.setRoot(LoginPage);
				console.error('Error getting token', JSON.stringify(error));
		});
	}

  storetoken(){
    // let toast = this.toastCtrl.create({
    //   message: 'Initialize device...'
    // });
    // toast.present();
    this.http.post(this.host+'LoginCtrl/initToken/',JSON.stringify(this.init))
      .subscribe(data => {
        // toast.dismiss();
        // let _toast = this.toastCtrl.create({
        //   message: 'Init device succesful.',
        //   duration: 3000,
        //   showCloseButton: true,
        //   closeButtonText: 'Ok'
        // });
        // _toast.present();
      },err => {
        console.log(JSON.stringify(err));
        // toast.dismiss();
        let _toast = this.toastCtrl.create({
          message: 'Ooopssss, Failed init device.',
          duration: 5000,
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        _toast.present();
      });
  }

  refreshing(refresher){
    this.loading.present();
    alert(this.tabsmanager);
    if (this.tabsmanager === 'task') {
      this.initialize();
      refresher.complete();
    }
  }

	// Modal Section
	openProfileModal(){
  	let modal = this.modalCtrl.create(profileModal, { nik : this.employee.nik, name : this.employee.employee_name,level : this.employee.role,role_desc : this.employee.role_desc, email : this.employee.employee_email, phone : this.employee.employee_phone, address : this.employee.employee_address, token : this.accessToken });
  	modal.onDidDismiss(() => {
      this.initialize();
    });
  	modal.present();
	}
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
	
  // Push page schedule
  pushPageSchedule(event,item) {
    if (this.thisPrevilage === 'MTR') {
      this.navCtrl.push(MeterDetail, {
        item: item,
        nik : this.nik
      });
    } else if(this.thisPrevilage === 'SE') {
      this.navCtrl.push(DetailEngSchedule, {
        item: item,
        nik : this.nik
      });
    } else {
      console.log(item);
    }
  }

  // Push page task
  pushPageTask(event,item) {
    if (this.thisPrevilage === 'DLV') {
      this.navCtrl.push(DetailDelivery, {
        item: item
      });
    } else if(this.thisPrevilage === 'SPV' || this.thisPrevilage === 'helpdesk' || this.thisPrevilage === 'CC') {
      this.navCtrl.push(DetailHelpdesk, {
        item: item,
        history : 2,
      });
    } else if(this.thisPrevilage === 'SE') {
      this.navCtrl.push(DetailEngTask, {
        item: item
      });
    } else {
      console.log(item);
    }
  }

  // Search
  searchSchedule(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.dataSchedule = this.dataSchedule.filter((item) => {
        return (item.detailCustomer.customer_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.dataSchedule = this.dupDataSchedule;
      return this.dataSchedule;
    }
  }
  searchTask(ev) {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.dataTask = this.dataTask.filter((item) => {
        return (item.detailCustomer.customer_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.dataTask = this.dupDataTask;
      return this.dataTask;
    }
  }

  // Dashboard
  toSchedule() {
    if (this.thisPrevilage === 'SE' || this.thisPrevilage === 'MTR') {
      this.tabsmanager = 'schedule';
    }
  }
  toTask() {
    this.tabsmanager = 'task';
  }
  listMessage(item) {
    this.navCtrl.push(ListGeneral, {
      item: item
    });
  }
  reportingPersonal(pm,customer_request,cawf,moreTwo) {
    this.navCtrl.push(ReportingPersonal, {
      pm: pm,
      customer_request : customer_request,
      cawf : cawf,
      more_two : moreTwo
    }); 
  }
  openBrowser(){
    const browser = this.iab.create('https://smart2.bt.konicaminolta.jp/mobile/','_system');
    browser.close();
  }

}
