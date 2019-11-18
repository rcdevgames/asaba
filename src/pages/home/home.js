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
import { NavController, ModalController, ActionSheetController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import { profileModal } from './profileModal';
import { MeterDetail } from '../meter_reader/detail/MeterDetail';
import { DetailDelivery } from '../delivery/detail/DetailDelivery';
import { DetailHelpdesk } from '../helpdesk/detail/DetailHelpdesk';
import { DetailEngSchedule } from '../engineer/schedule/detail/DetailEngSchedule';
import { DetailEngTask } from '../engineer/task/detail/DetailEngTask';
var HomePage = (function () {
    function HomePage(nativeStorage, navCtrl, modalCtrl, actionSheetCtrl, http, alertCtrl) {
        this.nativeStorage = nativeStorage;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.host = 'https://thinktask.abilhost.com/API/rest_api/';
        this.previlage = 'engineer';
        this.tabsmanager = 'dashboard';
        this.thisPrevilage = 'engineer';
        this.nik = '123';
        // Set host
        this.nativeStorage.setItem('rootHost', { 'host': this.host })
            .then(function (dataToken) { });
        // Initialize
        this.dataDashboard = { mif: 0, customer_call: 0, reporting_personal: 0, general_info: 0, smart: 0 };
        this.initialize();
        // if (this.platform.is('android')) {}
    } // Construct
    HomePage.prototype.ionViewDidEnter = function () {
        this.initialize();
    };
    // For Delivery
    HomePage.prototype.generateTaskDelivery = function (paramsNik) {
        var _this = this;
        this.http.get(this.host + 'DeliveryTask/getDeliveryListing/' + paramsNik, {})
            .subscribe(function (data) {
            _this.dataTask = data.json();
            _this.dupDataTask = data.json();
        }, function (err) {
            var errMsg = _this.alertCtrl.create({
                title: 'Ooopppss something happen!',
                message: err
            });
            errMsg.present();
        });
    };
    // For Helpdesk
    HomePage.prototype.generateTaskHelpdesk = function (paramsNik) {
        var _this = this;
        this.http.get(this.host + 'HelpdeskCtrl/listing/' + paramsNik, {})
            .subscribe(function (data) {
            _this.dataTask = data.json();
            _this.dupDataTask = data.json();
        }, function (err) {
            var errMsg = _this.alertCtrl.create({
                title: 'Ooopppss something happen!',
                message: err
            });
            errMsg.present();
        });
    };
    // For Engineer
    HomePage.prototype.generateTaskEngineer = function (paramsNik) {
        var _this = this;
        this.http.get(this.host + 'EngineerCtrl/listing/' + paramsNik, {})
            .subscribe(function (data) {
            _this.dataTask = data.json();
            _this.dupDataTask = data.json();
        }, function (err) {
            var errMsg = _this.alertCtrl.create({
                title: 'Ooopppss something happen!',
                message: err
            });
            errMsg.present();
        });
    };
    HomePage.prototype.generateScheduleEngineer = function (paramsNik) {
        var _this = this;
        this.http.get(this.host + 'ScheduleCtrl/listing/engineer/' + paramsNik, {})
            .subscribe(function (data) {
            _this.dataSchedule = data.json();
            _this.dupDataSchedule = data.json();
        }, function (err) {
            var errMsg = _this.alertCtrl.create({
                title: 'Ooopppss something happen!',
                message: err
            });
            errMsg.present();
        });
    };
    // For Meter Reader
    HomePage.prototype.generateScheduleMeter = function (paramsNik) {
        var _this = this;
        this.http.get(this.host + 'MeterCtrl/listing/meter_reader/' + paramsNik, {})
            .subscribe(function (data) {
            _this.dataSchedule = data.json();
            _this.dupDataSchedule = data.json();
        }, function (err) {
            var errMsg = _this.alertCtrl.create({
                title: 'Ooopppss something happen!',
                message: err
            });
            errMsg.present();
        });
    };
    // Dashboard
    HomePage.prototype.generateDashboardEngineer = function (paramsNik) {
        var _this = this;
        this.http.get(this.host + 'DashboardCtrl/dashboardEngineer/' + paramsNik, {})
            .subscribe(function (data) {
            var callBack = data.json();
            _this.dataDashboard.mif = callBack.mif;
            _this.dataDashboard.customer_call = callBack.customer_call;
            _this.dataDashboard.general_info = callBack.count_general_info;
        }, function (err) {
            var errMsg = _this.alertCtrl.create({
                title: 'Ooopppss something happen!',
                message: err
            });
            errMsg.present();
        });
    };
    // Initialize session
    HomePage.prototype.initialize = function () {
        var _this = this;
        this.nativeStorage.getItem('tokenStore').then(function (data) {
            if (data) {
                _this.nik = data.employee.nik;
                _this.accessToken = data.sessionToken;
                _this.previlage = data.previlage;
                _this.employee = data.employee;
                _this.thisPrevilage = data.employee.employee_level;
            }
            if (data.employee.employee_level === 'delivery') {
                _this.generateTaskDelivery(data.employee.nik);
            }
            else if (data.employee.employee_level === 'call_center' || data.employee.employee_level === 'helpdesk' || data.employee.employee_level === 'spv' || data.employee.employee_level === 'admin_spir') {
                _this.generateTaskHelpdesk(data.employee.nik);
            }
            else if (data.employee.employee_level === 'engineer') {
                _this.generateDashboardEngineer(data.employee.nik);
                _this.generateTaskEngineer(data.employee.nik);
                _this.generateScheduleEngineer(data.employee.nik);
            }
            else if (data.employee.employee_level === 'collect_meter') {
                _this.generateScheduleMeter(data.employee.nik);
            }
        }, function (error) {
            _this.navCtrl.setRoot(LoginPage);
            console.error('Error getting token', error);
        });
    };
    // Modal Section
    HomePage.prototype.openProfileModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(profileModal, { nik: this.employee.nik, name: this.employee.employee_name, level: this.employee.employee_level, email: this.employee.employee_email, phone: this.employee.employee_phone, address: this.employee.employee_address, token: this.accessToken });
        modal.onDidDismiss(function () {
            _this.initialize();
        });
        modal.present();
    };
    // Notification
    HomePage.prototype.presentActionSheet = function () {
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
    // Push page schedule
    HomePage.prototype.pushPageSchedule = function (event, item) {
        if (this.thisPrevilage === 'collect_meter') {
            this.navCtrl.push(MeterDetail, {
                item: item,
                nik: this.nik
            });
        }
        else if (this.thisPrevilage === 'engineer') {
            this.navCtrl.push(DetailEngSchedule, {
                item: item,
                nik: this.nik
            });
        }
        else {
            console.log(item);
        }
    };
    // Push page task
    HomePage.prototype.pushPageTask = function (event, item) {
        if (this.thisPrevilage === 'delivery') {
            this.navCtrl.push(DetailDelivery, {
                item: item
            });
        }
        else if (this.thisPrevilage === 'spv' || this.thisPrevilage === 'helpdesk' || this.thisPrevilage === 'call_center') {
            this.navCtrl.push(DetailHelpdesk, {
                item: item,
                history: 2,
            });
        }
        else if (this.thisPrevilage === 'engineer') {
            this.navCtrl.push(DetailEngTask, {
                item: item
            });
        }
        else {
            console.log(item);
        }
    };
    // Search
    HomePage.prototype.searchSchedule = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.dataSchedule = this.dataSchedule.filter(function (item) {
                return (item.detailCustomer.customer_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.dataSchedule = this.dupDataSchedule;
            return this.dataSchedule;
        }
    };
    HomePage.prototype.searchTask = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.dataTask = this.dataTask.filter(function (item) {
                return (item.detailCustomer.customer_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.dataTask = this.dupDataTask;
            return this.dataTask;
        }
    };
    // Dashboard
    HomePage.prototype.mif = function () {
        this.tabsmanager = 'schedule';
    };
    HomePage.prototype.customerCall = function () {
        this.tabsmanager = 'task';
    };
    HomePage.prototype.listMessage = function (datak) {
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NativeStorage, NavController, ModalController, ActionSheetController, Http, AlertController])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map
