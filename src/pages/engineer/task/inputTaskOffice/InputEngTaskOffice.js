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
var InputEngTaskOffice = (function () {
    function InputEngTaskOffice(navCtrl, navParams, alert) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alert = alert;
        this.selectedTask = navParams.get('item');
        this.initialize();
        if (this.selectedTask.uncomplete === 'yes') {
            this.getLastMeter();
        }
    }
    InputEngTaskOffice.prototype.initialize = function () {
        this.input = { copy_black: 0, copy_color: 0, print_black: 0, print_color: 0, fax: 0, total_bw: 0, total_color: 0 };
    };
    InputEngTaskOffice.prototype.getLastMeter = function () {
        for (var _i = 0, _a = this.selectedTask.lastMeter.detail; _i < _a.length; _i++) {
            var detail = _a[_i];
            if (detail.item_name === 'copy_black') {
                this.input.copy_black = detail.item_qty;
            }
            if (detail.item_name === 'copy_color') {
                this.input.copy_color = detail.item_qty;
            }
            if (detail.item_name === 'print_black') {
                this.input.print_black = detail.item_qty;
            }
            if (detail.item_name === 'print_color') {
                this.input.print_color = detail.item_qty;
            }
            if (detail.item_name === 'fax') {
                this.input.fax = detail.item_qty;
            }
            if (detail.item_name === 'total_bw') {
                this.input.total_bw = detail.item_qty;
            }
            if (detail.item_name === 'total_color') {
                this.input.total_color = detail.item_qty;
            }
        }
    };
    InputEngTaskOffice.prototype.saveMeter = function () {
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
                        var sendMeter = [{
                                name: 'copy_black',
                                qty: _this.input.copy_black
                            }, {
                                name: 'copy_color',
                                qty: _this.input.copy_color
                            }, {
                                name: 'print_black',
                                qty: _this.input.print_black
                            }, {
                                name: 'print_color',
                                qty: _this.input.print_color
                            }, {
                                name: 'fax',
                                qty: _this.input.fax
                            }, {
                                name: 'total_bw',
                                qty: _this.input.total_bw
                            }, {
                                name: 'total_color',
                                qty: _this.input.total_color
                            }];
                        _this.navCtrl.push(CompleteEngTask, {
                            item: _this.selectedTask,
                            input: sendMeter
                        });
                    }
                }
            ] // Buttons
        }); // alert create
        warn.present();
    };
    return InputEngTaskOffice;
}());
InputEngTaskOffice = __decorate([
    Component({
        templateUrl: 'InputEngTaskOffice.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AlertController])
], InputEngTaskOffice);
export { InputEngTaskOffice };
//# sourceMappingURL=InputEngTaskOffice.js.map