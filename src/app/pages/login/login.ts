import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { matricule: '', password: '' };
  submitted = false;

  constructor(
    private userService: UserService,
    public userData: UserData,
    public router: Router,
    private alertCtrl: AlertController
  ) { }


  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({  
      message: message,  
      buttons: ['OK']  
    });  
    await alert.present();  
  }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.userService.login(form.value).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.router.navigateByUrl('/app/tabs/schedule');
          },
          error: (error) => {
             this.showAlert(error.message);
          }
        }
      )
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
