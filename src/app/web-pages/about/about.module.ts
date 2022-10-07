import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {AboutComponent} from "./about.component";
import {AboutRoutingModule} from "./about-routing.module";
import {ComponentsModule} from "../components/components.module";

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class AboutModule {
}
