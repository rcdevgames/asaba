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
import { NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../pages/home/home';
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, toastCtrl, nativeStorage, http, loadingCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.nativeStorage = nativeStorage;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        // Get Host
        this.nativeStorage.getItem('rootHost').then(function (data) {
            _this.host = data.host;
        });
        // Initalize
        this.login = { nik: '', password: '' };
        var toast = this.toastCtrl.create({
            message: 'Unauthorized, please log in first!',
            duration: 5000,
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    }
    LoginPage.prototype.generateToken = function (params) {
        var _this = this;
        this.nativeStorage.setItem('tokenStore', { 'sessionToken': params.session, 'previlage': params.previlage, 'employee': params.data })
            .then(function (dataToken) {
            _this.accessToken = dataToken;
        }, function (error) { return console.error('Error storing token', error); });
        // Events
        this.events.publish('user:created', params.previlage, Date.now());
    };
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        if (this.login.nik === '' || this.login.password === '') {
            var toast = this.toastCtrl.create({
                message: 'nik and password cannot be null',
                duration: 5000,
                showCloseButton: true,
                closeButtonText: 'Ok'
            });
            toast.present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            // 45.76.154.5/api
            // asabaapi.abilhost.com
            this.http.post(this.host + 'LoginCtrl/employeeLogin/', JSON.stringify(this.login))
                .subscribe(function (data) {
                loading_1.dismiss();
                _this.generateToken(data.json());
                _this.navCtrl.setRoot(HomePage);
            }, function (err) {
                loading_1.dismiss();
                var toast = _this.toastCtrl.create({
                    message: 'Ooopssss, NIK and password are invalid',
                    duration: 5000,
                    showCloseButton: true,
                    closeButtonText: 'Ok'
                });
                toast.present();
            });
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ToastController, NativeStorage, Http, LoadingController, Events])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map
