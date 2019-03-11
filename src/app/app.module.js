var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { profileModal } from '../pages/home/profileModal';
// Login
import { LoginPage } from '../pages/login/login';
// Meter Collect
import { MeterDetail } from '../pages/meter_reader/detail/MeterDetail';
import { CustomMeter } from '../pages/meter_reader/custom/CustomMeter';
import { GeneralGappMeter } from '../pages/meter_reader/generalGapp/GeneralGappMeter';
import { GeneralOpMeter } from '../pages/meter_reader/generalOp/GeneralOpMeter';
// Delivery
import { DetailDelivery } from '../pages/delivery/detail/DetailDelivery';
import { DetailHistoryDelivery } from '../pages/delivery/history/DetailHistoryDelivery';
// Helpdesk
import { DetailHelpdesk } from '../pages/helpdesk/detail/DetailHelpdesk';
import { ToTech } from '../pages/helpdesk/tech/ToTech';
// Engineer
import { DetailEngSchedule } from '../pages/engineer/schedule/detail/DetailEngSchedule';
import { InputEngPp } from '../pages/engineer/schedule/inputPp/InputEngPp';
import { InputEngOffice } from '../pages/engineer/schedule/inputOffice/InputEngOffice';
import { CompleteEngSchedule } from '../pages/engineer/schedule/complete/CompleteEngSchedule';
import { DetailEngTask } from '../pages/engineer/task/detail/DetailEngTask';
import { InputEngTaskPp } from '../pages/engineer/task/inputTaskPp/InputEngTaskPp';
import { InputEngTaskOffice } from '../pages/engineer/task/inputTaskOffice/InputEngTaskOffice';
import { CompleteEngTask } from '../pages/engineer/task/complete/CompleteEngTask';
import { ListHistoryEng } from '../pages/engineer/history/detail/ListHistoryEng';
import { DetailHistoryEng } from '../pages/engineer/history/detail/DetailHistoryEng';
import { MeterHistoryEng } from '../pages/engineer/history/meter/MeterHistoryEng';
// History
import { TaskHistory } from '../pages/history/task/TaskHistory';
import { ScheduleHistory } from '../pages/history/schedule/ScheduleHistory';
import { DetailScheduleHistory } from '../pages/engineer/history/schedule/DetailScheduleHistory';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            LoginPage,
            profileModal,
            MeterDetail,
            CustomMeter,
            GeneralGappMeter,
            GeneralOpMeter,
            DetailDelivery,
            DetailHelpdesk,
            ToTech,
            DetailEngSchedule,
            InputEngPp,
            InputEngOffice,
            CompleteEngSchedule,
            DetailEngTask,
            InputEngTaskPp,
            InputEngTaskOffice,
            CompleteEngTask,
            DetailHistoryEng,
            ListHistoryEng,
            MeterHistoryEng,
            TaskHistory,
            DetailHistoryDelivery,
            ScheduleHistory,
            DetailScheduleHistory
        ],
        imports: [
            BrowserModule,
            HttpModule,
            IonicModule.forRoot(MyApp),
            IonicStorageModule.forRoot({
                name: '__mydb',
                driverOrder: ['indexeddb', 'sqlite', 'websql']
            })
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            LoginPage,
            profileModal,
            MeterDetail,
            CustomMeter,
            GeneralGappMeter,
            GeneralOpMeter,
            DetailDelivery,
            DetailHelpdesk,
            ToTech,
            DetailEngSchedule,
            InputEngPp,
            InputEngOffice,
            CompleteEngSchedule,
            DetailEngTask,
            InputEngTaskPp,
            InputEngTaskOffice,
            CompleteEngTask,
            DetailHistoryEng,
            ListHistoryEng,
            MeterHistoryEng,
            TaskHistory,
            DetailHistoryDelivery,
            ScheduleHistory,
            DetailScheduleHistory
        ],
        providers: [
            StatusBar,
            SplashScreen,
            SQLite,
            NativeStorage,
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map
