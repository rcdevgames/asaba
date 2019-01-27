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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CompleteEngTask } from '../complete/CompleteEngTask';
var InputEngTaskPp = (function () {
    function InputEngTaskPp(navCtrl, navParams, alert) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alert = alert;
        this.selectedTask = navParams.get('item');
        this.input = { total_bw: 0, total_color: 0, total: 0 };
        if (this.selectedTask.uncomplete === 'yes') {
            this.getLastMeter();
        }
    }
    InputEngTaskPp.prototype.getLastMeter = function () {
        for (var _i = 0, _a = this.selectedTask.lastMeter.detail; _i < _a.length; _i++) {
            var detail = _a[_i];
            if (detail.item_name === 'total_bw') {
                this.input.total_bw = detail.item_qty;
            }
            if (detail.item_name === 'total_color') {
                this.input.total_color = detail.item_qty;
            }
            if (detail.item_name === 'total') {
                this.input.total = detail.item_qty;
            }
        }
    };
    InputEngTaskPp.prototype.calc = function () {
        this.input.total = Math.floor(this.input.total_bw) + Math.floor(this.input.total_color);
    };
    InputEngTaskPp.prototype.saveMeter = function () {
        var _this = this;
        var warn = this.alert.create({
            title: 'Are you sure ?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Canceling saving meter');
                    }
                }, {
                    text: 'Yes',
                    handler: function () {
                        if (_this.input.total_bw != 0 || _this.input.total_color != 0) {
                            var sendMeter = [{
                                    name: 'total_bw',
                                    qty: _this.input.total_bw
                                }, {
                                    name: 'total_color',
                                    qty: _this.input.total_color
                                }, {
                                    name: 'total',
                                    qty: _this.input.total
                                }];
                            _this.navCtrl.push(CompleteEngTask, {
                                item: _this.selectedTask,
                                input: sendMeter
                            });
                        }
                    }
                }
            ] // Buttons
        }); // alert create
        warn.present();
    };
    return InputEngTaskPp;
}());
InputEngTaskPp = __decorate([
    Component({
        templateUrl: 'InputEngTaskPp.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController])
], InputEngTaskPp);
export { InputEngTaskPp };
//# sourceMappingURL=InputEngTaskPp.js.map