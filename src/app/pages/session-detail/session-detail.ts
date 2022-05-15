import { Component } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;
  isFavorite = false;
  defaultHref = '';
  Attendance = []
  AttendaceDetail = {};

  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ionViewWillEnter() {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.http.get('http://localhost:3000/attendeace').subscribe(
      {
        next: (response: any) => {
          this.Attendance = response;
          this.AttendaceDetail = response.find(element => element.session_id.toString() === sessionId);
          console.log(this.AttendaceDetail);
        }
      }
    )
    // this.dataProvider.load().subscribe((data: any) => {
    //   if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
    //     const sessionId = this.route.snapshot.paramMap.get('sessionId');
    //     for (const group of data.schedule[0].groups) {
    //       if (group && group.sessions) {
    //         for (const session of group.sessions) {
    //           if (session && session.id === sessionId) {
    //             this.session = session;

    //             this.isFavorite = this.userProvider.hasFavorite(
    //               this.session.name
    //             );

    //             break;
    //           }
    //         }
    //       }
    //     }
    //   }
    // });
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;
  }

  sessionClick(item: string) {
    console.log('Clicked', item);
  }

  toggleFavorite() {
    if (this.userProvider.hasFavorite(this.session.name)) {
      this.userProvider.removeFavorite(this.session.name);
      this.isFavorite = false;
    } else {
      this.userProvider.addFavorite(this.session.name);
      this.isFavorite = true;
    }
  }

  shareSession() {
    console.log('Clicked share session');
  }
}
