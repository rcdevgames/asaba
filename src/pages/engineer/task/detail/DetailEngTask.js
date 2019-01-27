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
import { InputEngTaskPp } from '../inputTaskPp/InputEngTaskPp';
import { InputEngTaskOffice } from '../inputTaskOffice/InputEngTaskOffice';
import { CompleteEngTask } from '../complete/CompleteEngTask';
import { ListHistoryEng } from '../../history/detail/ListHistoryEng';
var DetailEngTask = (function () {
    function DetailEngTask(navCtrl, navParams, alertCtrl, loading, http, nativeStorage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loading = loading;
        this.http = http;
        this.nativeStorage = nativeStorage;
        this.status = 'default';
        this.load = this.loading.create({
            content: 'Please wait...'
        });
        this.selectedTask = navParams.get('item');
        // Get Host
        this.nativeStorage.getItem('rootHost').then(function (data) {
            _this.host = data.host;
        });
    }
    // Push To Meter History
    DetailEngTask.prototype.meterHistory = function () {
        this.navCtrl.push(ListHistoryEng, {
            item: this.selectedTask.history
        });
    };
    // Action
    DetailEngTask.prototype.cancelProcess = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Are you sure ?',
            buttons: [{
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Canceling cancel process');
                    }
                }, {
                    text: 'Yes',
                    handler: function () {
                        _this.http.get(_this.host + 'EngineerCtrl/changeStatus/' + _this.selectedTask.id_trouble + '/assigned', {})
                            .subscribe(function (data) {
                            _this.status = 'default';
                            _this.navCtrl.popToRoot();
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }]
        });
        alert.present();
    };
    DetailEngTask.prototype.takeTask = function () {
        var _this = this;
        this.load.present();
        this.http.get(this.host + 'EngineerCtrl/changeStatus/' + this.selectedTask.id_trouble + '/took', {})
            .subscribe(function (data) {
            _this.load.dismiss();
            _this.status = 'took';
        }, function (err) {
            var errMsg = _this.alertCtrl.create({
                title: 'Ooopppss something happen!',
                message: err
            });
            errMsg.present();
        });
    };
    DetailEngTask.prototype.arrived = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Arrived Confirmation',
            message: 'Apakah anda sudah sampai di lokasi customer?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Canceling arriving');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.http.get(_this.host + 'EngineerCtrl/changeStatus/' + _this.selectedTask.id_trouble + '/arrived', {})
                            .subscribe(function (data) {
                            _this.status = 'arrived';
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    DetailEngTask.prototype.inputMeter = function () {
        if (this.selectedTask.machineType.type === 'g-gapp') {
            this.navCtrl.push(InputEngTaskPp, {
                item: this.selectedTask
            });
        }
        else if (this.selectedTask.machineType.type === 'g-op') {
            this.navCtrl.push(InputEngTaskOffice, {
                item: this.selectedTask
            });
        }
    };
    DetailEngTask.prototype.completeTask = function () {
        this.navCtrl.push(CompleteEngTask, {
            item: this.selectedTask,
            input: 'false'
        });
    };
    return DetailEngTask;
}());
DetailEngTask = __decorate([
    Component({
        templateUrl: 'DetailEngTask.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController, LoadingController, Http, NativeStorage])
], DetailEngTask);
export { DetailEngTask };
//# sourceMappingURL=DetailEngTask.js.map