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
import { ToTech } from '../tech/ToTech';
var DetailHelpdesk = (function () {
    function DetailHelpdesk(navCtrl, navParams, alertCtrl, nativeStorage, http, loading) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.nativeStorage = nativeStorage;
        this.http = http;
        this.loading = loading;
        this.selectedItem = navParams.get('item');
        this.historyVal = navParams.get('history');
        // Get Host
        this.nativeStorage.getItem('rootHost').then(function (data) {
            _this.host = data.host;
        });
        this.nativeStorage.getItem('tokenStore').then(function (data) {
            _this.nik = data.employee.nik;
        }, function (error) { console.error('Error getting token', error); });
    }
    DetailHelpdesk.prototype.byCall = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Fix by a call phone',
            message: 'Apakah problem customer dapat selesai dengan percakapan telepon?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Fix by phone canceled');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        var loading = _this.loading.create({
                            content: 'Please wait...'
                        });
                        loading.present();
                        _this.http.get(_this.host + 'HelpdeskCtrl/finishedByPhone/' + _this.selectedItem.id_trouble + '/' + _this.nik, {})
                            .subscribe(function (data) {
                            loading.dismiss();
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
    DetailHelpdesk.prototype.toTech = function (event, item) {
        this.navCtrl.push(ToTech, {
            item: item,
            nik: this.nik
        });
    };
    return DetailHelpdesk;
}());
DetailHelpdesk = __decorate([
    Component({
        templateUrl: 'DetailHelpdesk.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController, NativeStorage, Http, LoadingController])
], DetailHelpdesk);
export { DetailHelpdesk };
//# sourceMappingURL=DetailHelpdesk.js.map