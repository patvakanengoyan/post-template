import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    RouterModule
  ],
  exports: [FooterComponent, HeaderComponent]
})
export class ComponentsModule { }
