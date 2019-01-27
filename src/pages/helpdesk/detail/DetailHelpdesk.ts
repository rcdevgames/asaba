import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController  } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http  } from '@angular/http';
import 'rxjs/add/operator/map';

import { ToTech } from '../tech/ToTech';
import { MeterHistoryEng } from '../../engineer/history/meter/MeterHistoryEng';
import { ListHistoryEng } from '../../engineer/history/detail/ListHistoryEng';
@Component({
  templateUrl: 'DetailHelpdesk.html'
})
export class DetailHelpdesk {
  selectedItem: any;
  historyVal : any;
  nik : any;
  host : any;
  status : string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,private nativeStorage: NativeStorage,public http : Http,public loading : LoadingController) {
    this.selectedItem = navParams.get('item');
    this.historyVal = navParams.get('history');
    // Get Host
    this.nativeStorage.getItem('rootHost').then( 
    data => {
      this.host = data.host;
    });
    this.nativeStorage.getItem('tokenStore').then( 
		data => {
			this.nik = data.employee.nik;
		},error => { console.error('Error getting token', error)}
	);
  }

  byCall() {
  	let alertz = this.alertCtrl.create({
	    title: 'Fix by a call phone',
	    message: 'Apakah problem customer dapat selesai dengan percakapan telepon?',
	    buttons: [
	      {
	        text: 'No',
	        role: 'cancel',
	        handler: () => {
	          console.log('Fix by phone canceled');
	        }
	      },
	      {
	        text: 'Yes',
	        handler: () => {
	          let loading = this.loading.create({
		        content: 'Please wait...'
		      });
		  	  loading.present();
	          this.http.get(this.host+'HelpdeskCtrl/finishedByPhone/'+this.selectedItem.id_trouble+'/'+this.nik,{})
		      .subscribe(data => {
		        loading.dismiss();
		        this.navCtrl.pop();
		      },err => {
		       	alert(JSON.stringify(err));
		      });
	        }
	      }
	    ]
	  });
	  alertz.present();
  }
  toTech(event,item) {
  	this.navCtrl.push(ToTech, {
      item: item,
      nik : this.nik
    });
  }

  viewMeter() {
  	this.navCtrl.push(ListHistoryEng, {
      item: this.selectedItem.history
    });
  }

  takeTask() {
    let loading = this.loading.create({
	    content: 'Please wait...'
  	});
	loading.present();
    this.http.get(this.host+'EngineerCtrl/changeStatus/'+this.selectedItem.id_trouble+'/took',{})
      .subscribe(data => {
        loading.dismiss();
        this.status = 'took';
        this.navCtrl.popToRoot();
      },err => {
        // let errMsg = this.alertCtrl.create({
        //   title : 'Ooopppss something happen!',
        //   message : err
        // })
        // errMsg.present();
        alert(JSON.stringify(err));
      });
  }
}
