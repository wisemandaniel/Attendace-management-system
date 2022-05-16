import { Component } from '@angular/core';

import { PopoverController } from '@ionic/angular';

@Component({
  template: `
    <ion-text>
        <h2 style="text-align: center; margin-top: 10px">Contact developer</h2>
    </ion-text>
    <ion-list>
      <ion-item button (click)="close('https://github.com/wisemandaniel')">
      <ion-icon slot="start" name="logo-github"></ion-icon>
        <ion-label>Github</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://www.linkedin.com/in/ndzo-daniel-ughe/')">
      <ion-icon slot="start" name="logo-linkedin"></ion-icon>
        <ion-label>LinkIn</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://twitter.com/Wiseman53326059')">
      <ion-icon slot="start" name="logo-twitter"></ion-icon>
        <ion-label>Twitter</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://www.facebook.com/ndzo.daniel.94/')">
      <ion-icon slot="start" name="logo-facebook"></ion-icon>
        <ion-label>Facebook</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://www.instagram.com/ndzodan/')">
      <ion-icon slot="start" name="logo-instagram"></ion-icon>
        <ion-label>Instagram</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://api.whatsapp.com/send?phone=678313613&text=Hello%20Dan,%20I%20am....')">
      <ion-icon slot="start" name="logo-whatsapp"></ion-icon>
        <ion-label>Whatsapp</ion-label>
      </ion-item>
      <ion-item button (click)="support()">
      <ion-icon slot="start" name="help"></ion-icon>
        <ion-label>help</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public popoverCtrl: PopoverController) {}

  support() {
    // this.app.getRootNavs()[0].push('/support');
    this.popoverCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.popoverCtrl.dismiss();
  }
}
