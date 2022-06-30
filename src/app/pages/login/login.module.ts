import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login';
import { LoginPageRoutingModule } from './login-routing.module';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    LoginPageRoutingModule
  ],
  declarations: [
    LoginPage,
  ]
})
export class LoginModule { }
