import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation';

import { HomePage } from '../pages/home/home';
import { TaskHistory } from '../pages/history/task/TaskHistory';
import { ScheduleHistory } from '../pages/history/schedule/ScheduleHistory';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  previlage : any;
  constructor(public platform: Platform, public splashScreen: SplashScreen, public events : Events,public nativeStorage : NativeStorage, private backgroundMode: BackgroundMode, private geolocation: Geolocation) {
    this.initializeApp();
    // Validation
    // First Loaded
    // this.nativeStorage.getItem('tokenStore').then(
    //   data => {
    //     console.log(data.employee.role);
    //   this.intializePage(data.employee.role);
    // });
    // On Going
    events.subscribe('user:created', (user, time) => {
      console.log(user);
      this.intializePage(user);
    });

    // Watch Position
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data)=>{
      var location = {
        'latitude': data.coords.latitude,
        'longitude': data.coords.longitude
      };
      this.events.publish('location:created', location, Date.now());
      // this.canArrive = false;
      // this.load.dismiss();
      // var lat = this.selectedTask.contract.gps_coordinate.substr(0, this.selectedTask.contract.gps_coordinate.indexOf(','));
      // var long = this.selectedTask.contract.gps_coordinate.substr(this.selectedTask.contract.gps_coordinate.indexOf(',') + 1);
      // // this.jarak = this.calcCrow(data.coords.latitude, data.coords.longitude, lat, long);
      // // alert(data.coords.latitude+' - '+data.coords.longitude);
      // if (data.coords.latitude && data.coords.longitude) {
      //   if (this.calcCrow(data.coords.latitude, data.coords.longitude, lat, long)) {
      //     // if (this.arived == false) alert('Kamu sudah sampai');
      //     this.arived = true;
      //   }else{
      //     this.arived = false;
      //   }
      // }
    });
  }

  intializePage(previlage) {
    if (previlage === 'DLV' || previlage === 'SPV' || previlage === 'CC' || previlage === 'helpdesk') {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Task History', component: TaskHistory },
      ];
    } else if(previlage === 'MTR') {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Schedule History', component: ScheduleHistory },
      ];
    } else if(previlage === 'SE'){
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Task History', component: TaskHistory },
        { title: 'Schedule History', component: ScheduleHistory },
      ];
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      // First Loaded
      // this.backgroundMode.enable();
      this.nativeStorage.getItem('tokenStore').then(
        data => {
          console.log(data.employee.role);
        this.intializePage(data.employee.role);
      });
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
