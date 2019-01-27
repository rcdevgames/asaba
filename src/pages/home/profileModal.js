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
import { NavController, ModalController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var profileModal = (function () {
    function profileModal(nativeStorage, params, navCtrl, modalCtrl, viewCtrl, http, loadingCtrl) {
        var _this = this;
        this.nativeStorage = nativeStorage;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        // Get Host
        this.nativeStorage.getItem('rootHost').then(function (data) {
            _this.host = data.host;
        });
        // Initialize
        // this.employee = {nik : '2013310016',name : params.get('employee'), level : '', email : '', phone : '', address : '',token : ''};
        this.employee = { nik: params.get('nik'), name: params.get('name'), level: params.get('level'), email: params.get('email'), phone: params.get('phone'), address: params.get('address'), token: params.get('token') };
    }
    profileModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    // 45.76.154.5/api
    // asabaapi.abilhost.com
    profileModal.prototype.logout = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        this.nativeStorage.remove('tokenStore').then(function () { return console.log('Logged out'); });
        this.http.post(this.host + 'LoginCtrl/allLogout/', JSON.stringify(this.employee))
            .subscribe(function (data) {
            loading.dismiss();
            _this.viewCtrl.dismiss();
        });
    };
    return profileModal;
}());
profileModal = __decorate([
    Component({
        templateUrl: 'profileModal.html'
    }),
    __metadata("design:paramtypes", [NativeStorage, NavParams, NavController, ModalController, ViewController, Http, LoadingController])
], profileModal);
export { profileModal };
//# sourceMappingURL=profileModal.js.map