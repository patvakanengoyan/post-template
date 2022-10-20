import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {RegistrationComponent} from "./registration.component";
import {RegistrationRoutingModule} from "./registration-routing.module";

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class RegistrationModule {
}
