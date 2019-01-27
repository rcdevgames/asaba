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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var CompleteEngTask = (function () {
    function CompleteEngTask(navCtrl, navParams, loading, http, nativeStorage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.http = http;
        this.nativeStorage = nativeStorage;
        this.selectedSchedule = navParams.get('item');
        this.inputMeter = navParams.get('input');
        // Get Host
        this.nativeStorage.getItem('rootHost').then(function (data) {
            _this.host = data.host;
        });
        // Original
        this.complete = { status: 0, status_desc: '', id_trouble: this.selectedSchedule.id_trouble };
        this.nativeStorage.getItem('tokenStore').then(function (data) {
            _this.inputMeter = { id_trouble: _this.selectedSchedule.id_trouble, nik: data.employee.nik, id_contract: _this.selectedSchedule.contract.id_contract, detailInput: _this.inputMeter };
        }, function (error) { console.error('Error getting token', error); });
    }
    CompleteEngTask.prototype.setComplete = function () {
        var _this = this;
        var load = this.loading.create({
            content: 'Please wait...'
        });
        load.present();
        if (this.complete.status === 0) {
            load.dismiss();
        }
        else {
            this.http.post(this.host + 'EngineerCtrl/inputMeter/', JSON.stringify(this.inputMeter))
                .subscribe(function (data) {
                _this.http.post(_this.host + 'EngineerCtrl/completeTask/', JSON.stringify(_this.complete))
                    .subscribe(function (data) {
                    load.dismiss();
                    _this.navCtrl.popToRoot();
                }); // Done complete task
            }); // Done input Meter
        }
    };
    return CompleteEngTask;
}());
CompleteEngTask = __decorate([
    Component({
        templateUrl: 'CompleteEngTask.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LoadingController, Http, NativeStorage])
], CompleteEngTask);
export { CompleteEngTask };
//# sourceMappingURL=CompleteEngTask.js.map