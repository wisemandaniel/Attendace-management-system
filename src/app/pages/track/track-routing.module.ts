import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TrackComponent } from "./track.component";

const routes = [
    {
        path: '',
        TrackComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TrackRoutingModule {}