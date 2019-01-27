import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import { GeneralDetail} from './GeneralDetail';

@Component({
  templateUrl: 'ListGeneral.html'
})
export class ListGeneral {
  selectedItem: any;
  host : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('item');
    
  }
  detail(item) {
  	this.navCtrl.push(GeneralDetail, {
       item: item,
    });
  }
}