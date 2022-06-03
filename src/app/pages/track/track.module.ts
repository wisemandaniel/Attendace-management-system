import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TrackRoutingModule } from "./track-routing.module";
import { TrackComponent } from "./track.component";

@NgModule((
    {
        imports: [
            CommonModule,
            TrackRoutingModule,
            IonicModule
          ],
          declarations: [
            TrackComponent,
          ]
    }
))

export class TrackModule {}