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
import { NavController, NavParams, AlertController, LoadingController, ModalController, ActionSheetController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { profileModal } from '../../home/profileModal';
import { DetailHistoryEng } from '../../engineer/history/detail/DetailHistoryEng';
import { DetailHistoryDelivery } from '../../delivery/history/DetailHistoryDelivery';
import { DetailHelpdesk } from '../../helpdesk/detail/DetailHelpdesk';
var TaskHistory = (function () {
    function TaskHistory(navCtrl, navParams, nativeStorage, http, alertCtrl, loading, modalCtrl, actionSheetCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.nativeStorage = nativeStorage;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loading = loading;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.load = this.loading.create({
            content: 'Please wait...'
        });
        // Get NIK
        this.nativeStorage.getItem('tokenStore').then(function (data) {
            _this.nik = data.employee.nik;
            _this.previlage = data.employee.employee_level;
            _this.employee = data.employee;
        });
        // Get Host
        this.load.present();
        this.nativeStorage.getItem('rootHost').then(function (data) {
            if (_this.previlage === 'engineer') {
                _this.generateEngTask(data.host);
            }
            else if (_this.previlage === 'delivery') {
                _this.generateDeliveryTask(data.host);
            }
            else if (_this.previlage === 'spv' || _this.previlage === 'helpdesk' || _this.previlage == 'call_center') {
                _this.generateHelpdeskTask(data.host);
            }
            else {
                _this.load.dismiss();
            }
        });
        // Initialize
    }
    TaskHistory.prototype.generateEngTask = function (host) {
        var _this = this;
        this.http.get(host + 'HistoryCtrl/listingTaskEngineer/' + this.nik, {})
            .subscribe(function (data) {
            _this.dataHistory = data.json();
            _this.load.dismiss();
        }, function (err) {
            var errMsg = _this.alertCtrl.create({
                title: 'Ooopppss something happen!',
                message: err
            });
            errMsg.present();
        });
    };
    TaskHistory.prototype.generateDeliveryTask = function (host) {
        var _this = this;
        this.http.get(host + 'HistoryCtrl/listingTaskDelivery/' + this.nik, {})
            .subscribe(function (data) {
            _this.dataHistory = data.json();
            _this.load.dismiss();
        }, function (err) {
            var errMsg = _this.alertCtrl.create({
                title: 'Ooopppss something happen!',
                message: err
            });
            errMsg.present();
        });
    };
    TaskHistory.prototype.generateHelpdeskTask = function (host) {
        var _this = this;
        this.http.get(host + 'HistoryCtrl/listingTaskHelpdesk/' + this.nik, {})
            .subscribe(function (data) {
            _this.dataHistory = data.json();
            _this.load.dismiss();
        }, function (err) {
            var errMsg = _this.alertCtrl.create({
                title: 'Ooopppss something happen!',
                message: err
            });
            errMsg.present();
        });
    };
    TaskHistory.prototype.selectHistory = function (data) {
        if (this.previlage === 'engineer') {
            this.navCtrl.push(DetailHistoryEng, {
                item: data
            });
        }
        else if (this.previlage === 'delivery') {
            this.navCtrl.push(DetailHistoryDelivery, {
                item: data
            });
        }
        else if (this.previlage === 'helpdesk' || this.previlage === 'spv' || this.previlage === 'call_center') {
            this.navCtrl.push(DetailHelpdesk, {
                item: data,
                history: 1
            });
        }
    };
    // Profile Modal
    TaskHistory.prototype.openProfileModal = function () {
        var modal = this.modalCtrl.create(profileModal, { nik: this.employee.nik, name: this.employee.employee_name, level: this.employee.employee_level, email: this.employee.employee_email, phone: this.employee.employee_phone, address: this.employee.employee_address });
        modal.onDidDismiss(function () {
        });
        modal.present();
    };
    // Action sheet
    // Notification
    TaskHistory.prototype.presentActionSheet = function () {
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Your Notification',
            buttons: [
                {
                    text: 'Anda mendapatkan task baru',
                    role: 'destructive',
                    handler: function () {
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Terdapat trouble di PT. Angkasa Jaya',
                    handler: function () {
                        console.log('Archive clicked');
                    }
                },
                {
                    text: 'Reminder : Maintenance PT. ABC 2 days left',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    return TaskHistory;
}());
TaskHistory = __decorate([
    Component({
        templateUrl: 'TaskHistory.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, NativeStorage, Http, AlertController, LoadingController, ModalController, ActionSheetController])
], TaskHistory);
export { TaskHistory };
//# sourceMappingURL=TaskHistory.js.map