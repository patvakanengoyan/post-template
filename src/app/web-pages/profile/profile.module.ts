import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class ProfileModule {
}
