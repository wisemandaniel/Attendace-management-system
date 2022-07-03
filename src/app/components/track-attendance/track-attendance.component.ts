import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AttendanceService } from '../../services/attendance/attendance.service';
import { MacAddress } from "mac-address";
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-track-attendance',
  templateUrl: './track-attendance.component.html',
  styleUrls: ['./track-attendance.component.css']
})
export class TrackAttendanceComponent implements OnInit {
  user: any;
  Sessions: any[] = [];
  macAddress = '';
  tracked = false;
  students: any[] = [];

  constructor(
    private attend: AttendanceService,
    private userService: UserService,
    public dialogRef: MatDialogRef<TrackAttendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
     const data =  localStorage.getItem('user');
     this.user = JSON.parse(data);
     console.log(this.user);

     this.getMacAddress();
    this.getStudents();
    this.getSessions();
     this.getSessions();
  }

  ionViewDidEnter() {
    this.getMacAddress();
    this.getStudents();
    this.getSessions();
  }

  getSessions() {
    this.attend.getSessions().subscribe(
      {
        next: (response: any) => {
          this.Sessions = response;
          console.log(response);
        },
        error: (error) => {
          alert(error);
        }
      }
    );
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

  submit(): void {
    console.log(this.data);
    const found = this.students.some(student => student.macAddress === this.macAddress);

    if(found === true){
      this.attend.recordAttndance(this.data).subscribe(
        {
          next: (response: any) => {
            this.dialogRef.close();
            const sess = this.Sessions;
            const found2 = sess.some(record => record.id === this.data.sessionId);
            if(found2) {
              console.log(found2);
            }
            console.log(response);
            this.tracked = true;
            alert(response.message);
          },
          error: (error) => {
            this.dialogRef.close();
            alert(error.error.message);
          }
        }
      );
    } else {
      alert('User not found with mac address ' + this.macAddress)
    }
  }
}
