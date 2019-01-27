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
import { NavController, NavParams } from 'ionic-angular';
import { CustomMeter } from '../custom/CustomMeter';
import { GeneralGappMeter } from '../generalGapp/GeneralGappMeter';
import { GeneralOpMeter } from '../generalOp/GeneralOpMeter';
var MeterDetail = (function () {
    function MeterDetail(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.selectedSchedule = navParams.get('item');
        this.nik = navParams.get('nik');
        // console.log(this.selectedSchedule);
    }
    MeterDetail.prototype.inputMeter = function (event, item) {
        if (item.machineType.type == 'custom') {
            this.navCtrl.push(CustomMeter, {
                item: item,
                nik: this.nik
            });
        }
        else if (item.machineType.type === 'g-gapp') {
            this.navCtrl.push(GeneralGappMeter, {
                item: item,
                nik: this.nik
            });
        }
        else if (item.machineType.type === 'g-op') {
            this.navCtrl.push(GeneralOpMeter, {
                item: item,
                nik: this.nik
            });
        }
    };
    return MeterDetail;
}());
MeterDetail = __decorate([
    Component({
        templateUrl: 'MeterDetail.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], MeterDetail);
export { MeterDetail };
//# sourceMappingURL=MeterDetail.js.map