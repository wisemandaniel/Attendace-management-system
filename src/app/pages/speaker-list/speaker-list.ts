import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseComponent } from '../add-course/add-course.component';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage {
  speakers: any[] = [];
  courses = [];

  constructor(
    public confData: ConferenceData, 
    private http: HttpClient,
    public alertCtrl: AlertController,
    public dialog: MatDialog) {}

  ionViewDidEnter() {
    this.getCourses();
    this.confData.getSpeakers().subscribe((speakers: any[]) => {
      this.speakers = speakers;
    });
  }

  getCourses() {
    this.http.get('http://localhost:3000/courses').subscribe(
      {
        next: (response: any) => {
           this.courses = response;
           console.log(this.courses);
        }
      }
    )
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
