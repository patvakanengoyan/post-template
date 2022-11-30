import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {ComponentsModule} from "../components/components.module";
import {SwiperModule} from "swiper/angular";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    SwiperModule
  ]
})
export class HomeModule {
}
