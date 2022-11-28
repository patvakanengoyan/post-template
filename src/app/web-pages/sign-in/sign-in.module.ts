import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {SignInComponent} from "./sign-in.component";
import {SignInRoutingModule} from "./sign-in-routing.module";

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class SignInModule {
}
