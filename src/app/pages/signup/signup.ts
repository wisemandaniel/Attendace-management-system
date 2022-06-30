// import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormControl, FormGroup, NgForm } from "@angular/forms";
// import { Router } from "@angular/router";

// import { UserData } from "../../providers/user-data";

// import { Storage } from "@ionic/storage";
// import { UserOptions2 } from "../../interfaces/user-options";
// import { UserService } from "../../services/user/user.service";
// import { AlertController } from "@ionic/angular";
// import { Uid } from "@ionic-native/uid/ngx";
// import { MacAddress } from "mac-address";
// import { MacAddressPlugin } from "../../../../mac-address/dist/esm/definitions";

// @Component({
//   selector: "page-signup",
//   templateUrl: "signup.html",
//   styleUrls: ["./signup.scss"],
// })
// export class SignupPage implements OnInit {

//   macAddress: string;

//   username: string ;

//   // signup: UserOptions2 = {
//   //   username: "",
//   //   email: "",
//   //   matricule: "",
//   //   role: "ROLE_STUDENT",
//   //   level: 200,
//   //   macAddress1: '',
//   //   password: "",
//   // };
//   submitted = false;

//   signupForm: FormGroup;

//   constructor(
//     private userService: UserService,
//     public router: Router,
//     public userData: UserData,
//     public storage: Storage,
//     private alertCtrl: AlertController,
//     private formBuilder: FormBuilder
//   ) {

//     this.signupForm = this.formBuilder.group({
//       username: '',
//       email: "",
//       matricule: "",
//       role: "ROLE_STUDENT",
//       level: 200,
//       macAddress1: '',
//       password: "",
//     });
//   }

//   async ngOnInit(): Promise<void> {

  //  await MacAddress.getMacAddress()
  //   .then((res) => {
  //     this.macAddress = res.value;
  //     alert(this.macAddress);
  //   })
  //   .catch((err) => {
  //     alert(err)
  //   });

//     const obj = {
//       name: this.signupForm.value.username,
//       email: this.signupForm.value.email,
//       matricule: this.signupForm.value.matricule,
//       role: this.signupForm.value.role,
//       level: this.signupForm.value.level,
//       macAddress: this.macAddress,
//       password: this.signupForm.value.password
//     }

//     console.log(obj);

//   }

//   async showAlert(message: string) {
//     const alert = await this.alertCtrl.create({
//       message: message,
//       buttons: ["OK"],
//     });
//     await alert.present();
//   }

//   onSignup(form) {
//     const obj = {
//       name: this.signupForm.value.username,
//       email: this.signupForm.value.email,
//       matricule: this.signupForm.value.matricule,
//       role: this.signupForm.value.role,
//       level: this.signupForm.value.level,
//       macAddress: this.macAddress,
//       password: this.signupForm.value.password
//     }

//     console.log(obj);

//     console.log(this.signupForm);
//     this.submitted = true;
//     // if (form.valid) {
//     this.userService.register(obj).subscribe({
//       next: (response: any) => {
//         this.showAlert(response.message);
//       },
//       error: (error) => {
//         this.showAlert(error.message);
//       },
//     });
//     // this.router.navigateByUrl('/app/tabs/schedule');
//     // }
//   }
// }





import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { MacAddress } from "mac-address";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage implements OnInit{

  macAddress = ''
  signupForm: any;
  submitted = false;
  isLoading = false;

  constructor(
    private userService: UserService,
    public router: Router,
    public userData: UserData,
    public storage: Storage,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController
  ) {}

  async ngOnInit() {

    this.signupForm  = { 
      username: '', 
      matricule: '',
      level: 200,
      password: '',
      role: 'ROLE_STUDENT',
      email: ''
    };

    await MacAddress.getMacAddress()
    .then((res) => {
      this.macAddress = res.value;
      alert(this.macAddress);
    })
    .catch((err) => {
      alert(err)
    });
    
  }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

   onSignup(form: NgForm) {
    this.isLoading = true;
    this.macAddress = 'mac-address-here';
    const obj = {
      username: this.signupForm.username,
      email: this.signupForm.email,
      matricule: this.signupForm.matricule,
      role: this.signupForm.role,
      level: this.signupForm.level,
      macAddress: this.macAddress,
      password: this.signupForm.password
    }
    // if (form.valid) {
      // this.presentLoading();
    this.userService.register(obj).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.showAlert(response.message);
      },
      error: (error) => {
        this.isLoading = false;
        this.showAlert(error.message);
      },
    });
    // this.router.navigateByUrl('/app/tabs/schedule');
    // }
  }
}

