import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { Storage } from '@ionic/storage';
import { UserOptions2 } from '../../interfaces/user-options';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {

  macAddress = 'somerandomestring'
  signup: UserOptions2 = { 
    name: '', 
    matricule: '',
    level: 200,
    macAddress: this.macAddress,
    password: '' 
  };
  submitted = false;

  constructor(
    public router: Router,
    public userData: UserData,
    public storage: Storage
  ) {}

  // onSignup(form: NgForm) {
  //   this.submitted = true;
  //   if (form.valid) {
  //     this.userData.signup(this.signup.name);
  //     this.router.navigateByUrl('/app/tabs/schedule');
  //   }
  // }

   onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
       this.userData.register(this.signup).subscribe(
        {
          next: (response) => {
            console.log(response);
          }
        }
      )
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }
}
