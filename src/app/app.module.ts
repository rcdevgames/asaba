import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { OneSignal } from '@ionic-native/onesignal';
import { BackgroundMode } from '@ionic-native/background-mode';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TextMaskModule } from 'angular2-text-mask';
// import { AppUpdate } from '@ionic-native/app-update';
// import { AppVersion } from '@ionic-native/app-version';

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
import { DirectMap } from '../pages/engineer/task/peta/DirectMap';


// History
import { TaskHistory } from '../pages/history/task/TaskHistory';
import { ScheduleHistory } from '../pages/history/schedule/ScheduleHistory';
import { DetailScheduleHistory } from '../pages/engineer/history/schedule/DetailScheduleHistory';

// Dashboard
import { ListGeneral } from '../pages/dashboard/general_info/ListGeneral';
import { GeneralDetail } from '../pages/dashboard/general_info/GeneralDetail';
import { ReportingPersonal } from '../pages/dashboard/reporting_personal/ReportingPersonal';

// import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
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
    DetailScheduleHistory,
    ListGeneral,
    GeneralDetail,
    ReportingPersonal,
    DirectMap
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TextMaskModule,
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
    DetailScheduleHistory,
    ListGeneral,
    GeneralDetail,
    ReportingPersonal,
    DirectMap
  ],
  providers: [
    SplashScreen,
    SQLite,
    NativeStorage,
    Geolocation,
    LaunchNavigator,
    File,
    FileTransfer,
    Camera,
    FilePath,
    OneSignal,
    BackgroundMode,
    InAppBrowser,
    // AppUpdate,
    // AppVersion,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
