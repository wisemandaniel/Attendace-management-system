import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseComponent } from '../add-course/add-course.component';
import { AttendanceService } from '../../services/attendance/attendance.service';
import { UserService } from '../../services/user/user.service';
import { MacAddress } from "mac-address";

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage {
  macAddress = '';
  students: any[] = [];
  courses = [];
  isCoursesEmpty = false;
  Sessions: any[] = [];

  constructor(
    public confData: ConferenceData, 
    private http: HttpClient,
    public alertCtrl: AlertController,
    public dialog: MatDialog,
    private userService: UserService,
    private attend: AttendanceService) {}

  ionViewDidEnter() {
    this.getMacAddress();
    this.getStudents();
    this.getSessions();
  }

  async getMacAddress() {
    await MacAddress.getMacAddress()
    .then((res) => {
      // this.macAddress = res.value;
      this.macAddress = "mac-address-here"
      alert(this.macAddress);
    })
    .catch((err) => {
      alert(err)
    });
  }

  getStudents() {
    this.userService.getAllStudents().subscribe(
      {
        next: (response: any) => {
          console.log(response);
          this.students = response;
        },
        error: (error) => {
          console.log(error.error.message);
        }
      }
    )
  }

  getSessions() {
    this.attend.getSessions().subscribe(
      {
        next: (response: any) => {
          this.Sessions = response;
        },
        error: (error) => {
          alert(error);
        }
      }
    );
  }

  recordAttendance(sessionId: string) {

    console.log(this.Sessions);
    const currentTime = new Date();
    const secondTime = new Date(currentTime);

    const current: any = currentTime.toLocaleTimeString();
    let status = '';
    
    for (let i = 0; i < this.Sessions.length; i++) {

      if(this.Sessions[i].id == sessionId) {
        const x = secondTime.getTime();
        const a: any = this.Sessions[i].day + ' ' + this.Sessions[i].startTime;
        const b: any = new Date(a);
        const presentTime = b.getMinutes() + 30;
        const c = b.setMinutes(presentTime);
        const d = new Date(c);
        const e = d.getTime();
        console.log(x);
        console.log(e);
        
        if(x <= e) {
          status = 'Early';
        } else {
          status = 'Late'
        }
      }
    }
    
    const obj = {
      remark: status,
      sessionId: sessionId
    }
  
  const found = this.students.some(student => student.macAddress === this.macAddress);

    if(found === true){
      this.attend.recordAttndance(obj).subscribe(
        {
          next: (response: any) => {
            console.log(response);
            alert(response.message);
          },
          error: (error) => {
            alert(error);
          }
        }
      );
    } else {
      alert('User not found with mac address ' + this.macAddress)
    }
  }

async openSocial() {
    const alert = await this.alertCtrl.create({
      header: 'Register course',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            
          }
        }
      ],
      
    });
    await alert.present();
  }

  addCourse() {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
