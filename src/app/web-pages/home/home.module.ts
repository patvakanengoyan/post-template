import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {ComponentsModule} from "../components/components.module";
import {CarouselModule} from "ngx-owl-carousel-o";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    CarouselModule
  ]
})
export class HomeModule {
}
