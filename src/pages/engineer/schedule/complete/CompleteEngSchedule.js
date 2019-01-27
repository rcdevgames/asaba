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
var CompleteEngSchedule = (function () {
    function CompleteEngSchedule(navCtrl, navParams, loading, http, nativeStorage) {
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
        this.complete = { status: 0, status_desc: '', id_schedule_customer: this.selectedSchedule.id_schedule_customer };
        this.nativeStorage.getItem('tokenStore').then(function (data) {
            _this.inputMeter = { nik: data.employee.nik, id_contract: _this.selectedSchedule.id_contract, detailInput: _this.inputMeter, id_schedule_customer: _this.selectedSchedule.id_schedule_customer };
        }, function (error) { console.error('Error getting token', error); });
    }
    CompleteEngSchedule.prototype.setComplete = function () {
        var _this = this;
        var load = this.loading.create({
            content: 'Please wait...'
        });
        load.present();
        if (this.complete.status === 0) {
            load.dismiss();
        }
        else {
            this.http.post(this.host + 'ScheduleCtrl/inputMeter', JSON.stringify(this.inputMeter))
                .subscribe(function (data) {
                _this.http.post(_this.host + 'ScheduleCtrl/completeSchedule', JSON.stringify(_this.complete))
                    .subscribe(function (res) {
                    load.dismiss();
                    _this.navCtrl.popToRoot();
                });
            });
        }
    };
    return CompleteEngSchedule;
}());
CompleteEngSchedule = __decorate([
    Component({
        templateUrl: 'CompleteEngSchedule.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LoadingController, Http, NativeStorage])
], CompleteEngSchedule);
export { CompleteEngSchedule };
//# sourceMappingURL=CompleteEngSchedule.js.map