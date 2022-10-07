import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {SinglePostComponent} from "./single-post.component";
import {SinglePostRoutingModule} from "./single-post-routing.module";

@NgModule({
  declarations: [SinglePostComponent],
  imports: [
    CommonModule,
    SinglePostRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class SinglePostModule {
}
