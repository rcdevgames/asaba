import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';


@Component({
  templateUrl: 'GeneralDetail.html'
})
export class GeneralDetail {
  choosed: any;
  host : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.choosed = navParams.get('item');
    
  }
}