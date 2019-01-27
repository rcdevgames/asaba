var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var DetailDelivery = (function () {
    function DetailDelivery(navCtrl, navParams, alertCtrl, http, loading, nativeStorage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.loading = loading;
        this.nativeStorage = nativeStorage;
        this.selectedSchedule = navParams.get('item');
        // Get Host
        this.nativeStorage.getItem('rootHost').then(function (data) {
            _this.host = data.host;
        });
    }
    DetailDelivery.prototype.completed = function (params) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are you sure ?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        var load = _this.loading.create({
                            content: 'Please Wait...'
                        });
                        load.present();
                        _this.http.get(_this.host + 'DeliveryTask/completeDelivery/' + params, {})
                            .subscribe(function (data) {
                            load.dismiss();
                            _this.navCtrl.pop();
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    return DetailDelivery;
}());
DetailDelivery = __decorate([
    Component({
        templateUrl: 'DetailDelivery.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController, Http, LoadingController, NativeStorage])
], DetailDelivery);
export { DetailDelivery };
//# sourceMappingURL=DetailDelivery.js.map