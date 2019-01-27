import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DetailHistoryEng } from './DetailHistoryEng';

@Component({
  templateUrl: 'ListHistoryEng.html'
})
export class ListHistoryEng {
  selectedHistory: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedHistory = navParams.get('item');
  }
  selectHistory(data) {
  	this.navCtrl.push(DetailHistoryEng, {
      item: data
    });
  }
}
