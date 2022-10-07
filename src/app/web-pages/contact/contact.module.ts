import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {ContactComponent} from "./contact.component";
import {ContactRoutingModule} from "./contact-routing.module";

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class ContactModule {
}
