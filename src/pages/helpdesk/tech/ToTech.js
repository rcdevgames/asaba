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
var ToTech = (function () {
    function ToTech(navCtrl, navParams, alertCtrl, loading, http, nativeStorage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loading = loading;
        this.http = http;
        this.nativeStorage = nativeStorage;
        // Get Host
        this.nativeStorage.getItem('rootHost').then(function (data) {
            _this.host = data.host;
            _this.http.get(data.host + 'HelpdeskCtrl/listingTech/', {})
                .subscribe(function (data) {
                _this.dataTech = data.json();
            }, function (err) {
                console.log(err);
            });
        });
        this.selectedItem = navParams.get('item');
        this.nik = navParams.get('nik');
        this.selectedTech = 0;
    }
    ToTech.prototype.confirmation = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Assign to technician',
            message: 'Apakah anda akan assign task ini ke teknisi?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Canceling assigning');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        var load = _this.loading.create({
                            content: 'Please wait...'
                        });
                        load.present();
                        if (_this.selectedTech != 0) {
                            _this.http.get(_this.host + 'HelpdeskCtrl/assignTech/' + _this.selectedItem.id_trouble + '/' + _this.selectedTech +
                                '/' + _this.nik, {})
                                .subscribe(function (data) {
                                load.dismiss();
                                _this.navCtrl.popToRoot();
                            }, function (err) {
                                console.log(err);
                            });
                        }
                        else {
                            load.dismiss();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    return ToTech;
}());
ToTech = __decorate([
    Component({
        templateUrl: 'ToTech.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController, LoadingController, Http, NativeStorage])
], ToTech);
export { ToTech };
//# sourceMappingURL=ToTech.js.map