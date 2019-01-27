import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'DetailHistoryDelivery.html'
})
export class DetailHistoryDelivery {
  dataHistory: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataHistory = navParams.get('item');
  }

}
