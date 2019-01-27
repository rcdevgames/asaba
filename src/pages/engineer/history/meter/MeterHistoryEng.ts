import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CurrencyPipe } from '@angular/common';

@Component({
  templateUrl: 'MeterHistoryEng.html'
})
export class MeterHistoryEng {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
  }
}
