import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MeterHistoryEng } from '../meter/MeterHistoryEng';

@Component({
  templateUrl: 'DetailHistoryEng.html'
})
export class DetailHistoryEng {
  selectedHistory: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedHistory = navParams.get('item');
  }
  viewMeter() {
  	this.navCtrl.push(MeterHistoryEng, {
      item: this.selectedHistory.detail_meter
    });
  }
}
