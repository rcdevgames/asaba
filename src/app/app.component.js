var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from '../pages/home/home';
import { TaskHistory } from '../pages/history/task/TaskHistory';
import { ScheduleHistory } from '../pages/history/schedule/ScheduleHistory';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, events, nativeStorage) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.events = events;
        this.nativeStorage = nativeStorage;
        this.rootPage = HomePage;
        this.initializeApp();
        // Validation
        // First Loaded
        this.nativeStorage.getItem('tokenStore').then(function (data) {
            _this.intializePage(data.employee.employee_level);
        });
        // On Going
        events.subscribe('user:created', function (user, time) {
            _this.intializePage(user);
        });
    }
    MyApp.prototype.intializePage = function (previlage) {
        if (previlage === 'delivery' || previlage === 'spv' || previlage === 'call_center' || previlage === 'helpdesk' || previlage === 'admin_spir') {
            this.pages = [
                { title: 'Home', component: HomePage },
                { title: 'Task History', component: TaskHistory },
            ];
        }
        else if (previlage === 'collect_meter') {
            this.pages = [
                { title: 'Home', component: HomePage },
                { title: 'Schedule History', component: ScheduleHistory },
            ];
        }
        else if (previlage === 'engineer') {
            this.pages = [
                { title: 'Home', component: HomePage },
                { title: 'Task History', component: TaskHistory },
                { title: 'Schedule History', component: ScheduleHistory },
            ];
        }
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, Events, NativeStorage])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map