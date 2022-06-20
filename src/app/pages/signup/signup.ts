import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { Storage } from '@ionic/storage';
import { UserOptions2 } from '../../interfaces/user-options';
import { UserService } from '../../services/user/user.service';
import { AlertController } from '@ionic/angular';
import { Uid } from '@ionic-native/uid/ngx';
import { MacAddress } from 'mac-address'
import { MacAddressPlugin } from '../../../../mac-address/dist/esm/definitions';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage implements OnInit{

  macAddress = '';
  signup: UserOptions2 = { 
    username: '', 
    email: '',
    matricule: '',
    role: 'ROLE_STUDENT',
    level: 200,
    macAddress: this.macAddress,
    password: '' 
  };
  submitted = false;

  constructor(
    private userService: UserService,
    public router: Router,
    public userData: UserData,
    public storage: Storage,
    private alertCtrl: AlertController,
    private uid: Uid,
     
  ) {}

  async ngOnInit(): Promise<void> {
    // this.macAddress = this.getID_UID('UUID');
  
    MacAddress.getMacAddress().then(res=>{
      this.macAddress=res.value
      alert(res.value);
    }).catch((err)=>{
      alert(err)
    })
  }

  // onSignup(form: NgForm) {
  //   this.submitted = true;
  //   if (form.valid) {
  //     this.userData.signup(this.signup.name);
  //     this.router.navigateByUrl('/app/tabs/schedule');
  //   }
  // }

  getID_UID(type){
    if(type == "IMEI"){
      return this.uid.IMEI;
    }else if(type == "ICCID"){
      return this.uid.ICCID;
    }else if(type == "IMSI"){
      return this.uid.IMSI;
    }else if(type == "MAC"){
      return this.uid.MAC;
    }else if(type == "UUID"){
      return this.uid.UUID;
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({  
      message: message,  
      buttons: ['OK']  
    });  
    await alert.present();  
  }

   onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
       this.userService.register(this.signup).subscribe(
        {
          next: (response: any) => {
            this.showAlert(response.message);
          },
          error: (error) => {
            this.showAlert(error.message);
          }
        }
      )
      // this.router.navigateByUrl('/app/tabs/schedule');
    }
  }
}
