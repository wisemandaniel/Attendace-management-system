import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { MacAddress } from 'mac-address'
import { AttendanceService } from '../../services/attendance/attendance.service';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  macAddress = '';

  color = 'green';

  Attendace = [];

  constructor(
    private attendanceService: AttendanceService, 
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    private http: HttpClient,
    private uniqueDeviceID: UniqueDeviceID,
    private attend: AttendanceService
  ) { }

  getUniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        this.uniqueDeviceID = uuid;
      })
      .catch((error: any) => {
      });
  }

  ionViewDidEnter() {
    this.getAttendanceHistory();
  }
  
  ngOnInit(): void {
   this.getAttendanceHistory();
   this.http.get('').subscribe(
    {
      next: (res) => {
        console.log(res);
      }
    }
   )
    
    MacAddress.getMacAddress().then(res=>{
      this.macAddress=res.value
      // alert(res.value);
    }).catch((err)=>{
      // alert(err)
    });
    // Check Permission on App Start
    this.getUniqueDeviceID();
    this.getAttendance();
    this.ios = this.config.get('mode') === 'ios';
  }

  trackAttendance() {

    const attendanceData = {
       remark: 'Late',
       sessionId: '11111111111111mmm'
    }

    this.attendanceService.recordAttndance(attendanceData).subscribe(
      // remark = attendanceData.remark = '';
      {
        next: (response) => {
           this.alertCtrl.create(response);
        }
      }
    )
  }

  async getAttendance() {
    
    await this.http.get('http://localhost:3000/attendeace').subscribe(
      {
        next: (response: any) => {
          // this.Attendace = response;
        }
      }
    );

    // console.log(this.Attendace);
  }


  getAttendanceHistory() {
    this.attend.getAttendanceHistory().subscribe(
      {
        next: (response: any) => {
          console.log('AttendHistory', response);
          this.Attendace = response;  
          

          // response.forEach((item: any) =>{
          //   var x = item.remark
          //   var y = item.session;
          //   console.log(x);
            
          //   if(x == 'Late') {
          //     this.color = 'red';
          //   } else {
          //     this.color = 'green';
          //   }

          //   console.log(this.color);
            
          // });
        }
      }
    );
    console.log(this.Attendace);
  }

  getAnnoucements() {
    this.Attendace = [];
    console.log(this.Attendace);
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }

  async track(fab: HTMLIonFabElement) {
    const attendanceData = {
      remark: 'Late',
      sessionId: ''
   }

   this.attendanceService.recordAttndance(attendanceData).subscribe(
     {
       next: (response) => {
         
       }
     }
   )

    if(!this.macAddress) {
      const loading = await this.loadingCtrl.create({
        message: 'Getting mac address',
        duration: (Math.random() * 1000) + 20000
      });
      await loading.present();
      await loading.onWillDismiss();
    } else {
      const loading = await this.loadingCtrl.create({
        message: 'Marking attendance',
        duration: (Math.random() * 1000) + 20000
      });
      await loading.present();
      await loading.onWillDismiss();
      fab.close();
    }
  }
}
