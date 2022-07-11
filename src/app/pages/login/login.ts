import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AlertController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
// import { Storage } from '@capacitor/storage';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: any = { matricule: '', password: '' };
  submitted = false;
  isLoading = false;

  constructor(
    private userService: UserService,
    public userData: UserData,
    public router: Router,
    private alertCtrl: AlertController,
    private store: Storage
  ) { }


  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({  
      message: message,  
      buttons: ['OK']  
    });  
    await alert.present();  
  }

  onLogin(form: NgForm) {
    this.isLoading = true;
    this.submitted = true;
    console.log(form.valid);
    if (form.valid) {
      
      this.userService.login(form.value).subscribe(
        {
          next: (response: any) => {
            const user = response
            console.log(user);     
            this.isLoading = false;
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('user', JSON.stringify(response));
            console.log(response);
            this.router.navigateByUrl('/app/tabs/schedule');
          },
          error: (error) => {     
            this.isLoading = false;
             if(error.error.message == null) {
              this.showAlert('Error reaching server, Please reconnect to the server and try again');
             } else{
              this.showAlert(error.error.message);
             }
          }
        }
      )
    } else {
      this.isLoading = false;
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
