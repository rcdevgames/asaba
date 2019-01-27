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
import { InputEngPp } from '../inputPp/InputEngPp';
import { InputEngOffice } from '../inputOffice/InputEngOffice';
import { CompleteEngSchedule } from '../complete/CompleteEngSchedule';
var DetailEngSchedule = (function () {
    function DetailEngSchedule(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.selectedSchedule = navParams.get('item');
        this.nik = navParams.get('nik');
    }
    DetailEngSchedule.prototype.inputMeter = function (event, item) {
        if (item.machineType.type === 'g-gapp') {
            this.navCtrl.push(InputEngPp, {
                item: item,
                nik: this.nik
            });
        }
        else if (item.machineType.type === 'g-op') {
            this.navCtrl.push(InputEngOffice, {
                item: item,
                nik: this.nik
            });
        }
    };
    DetailEngSchedule.prototype.taskComplete = function (event, item) {
        this.navCtrl.push(CompleteEngSchedule, {
            item: item,
            nik: this.nik
        });
    };
    return DetailEngSchedule;
}());
DetailEngSchedule = __decorate([
    Component({
        templateUrl: 'DetailEngSchedule.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], DetailEngSchedule);
export { DetailEngSchedule };
//# sourceMappingURL=DetailEngSchedule.js.map