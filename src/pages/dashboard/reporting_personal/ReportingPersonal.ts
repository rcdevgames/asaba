import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'ReportingPersonal.html'
})
export class ReportingPersonal {
  pm: any;
  customer_request : any;
  cawf : any;
  more_two : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pm = navParams.get('pm');
    this.customer_request = navParams.get('customer_request');
    this.cawf = navParams.get('cawf');
    this.more_two = navParams.get('more_two');
  }
}