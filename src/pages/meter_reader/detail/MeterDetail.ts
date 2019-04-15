import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { CustomMeter } from '../custom/CustomMeter';
import { GeneralGappMeter } from '../generalGapp/GeneralGappMeter';
import { GeneralOpMeter } from '../generalOp/GeneralOpMeter';

@Component({
  templateUrl: 'MeterDetail.html'
})
export class MeterDetail {
  selectedSchedule: any;
  nik : any;
  host : any = 'http://54.39.167.4/thinktaskapi/rest_api/';
  loading : any = this.loadingCtrl.create({
      content: 'Please wait...'
  });
  constructor(public navCtrl: NavController, public navParams: NavParams, public http : Http, public alertCtrl : AlertController, public loadingCtrl : LoadingController) {
    this.selectedSchedule = navParams.get('item');
    this.nik = navParams.get('nik');
    console.log(this.selectedSchedule);
  }

  inputMeter(event,item) {
    // Custom OR General
    if (item.contract.id_banner_option === '1') {
      this.navCtrl.push(CustomMeter, {
        item: item,
        nik : this.nik
      });
    } else {
      if(item.machineType.type === 'g-gapp') {
        this.navCtrl.push(GeneralGappMeter, {
          item: item,
          nik : this.nik
        });
      } else if(item.machineType.type === 'g-op') {
        this.navCtrl.push(GeneralOpMeter, {
          item: item,
          nik : this.nik
        });
      }
    }
  }

  takeTask(id) {
    this.loading.present();
    this.http.get(this.host+'MeterCtrl/tookSchedule/'+id,{})
      .subscribe(data => {
        this.navCtrl.popToRoot();
        this.loading.dismiss();
      },err => {
        // let errMsg = this.alertCtrl.create({
        //   title : 'Ooopppss something happen!',
        //   message : err
        // })
        // errMsg.present();
        alert(JSON.stringify(err));
        this.loading.dismiss();
      });
  }
}
