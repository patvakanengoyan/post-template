import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {RabbiVersionComponent} from "./rabbi-version.component";
import {RabbiVersionRoutingModule} from "./rabbi-version-routing.module";
import { RabbiVersionViewComponent } from './rabbi-version-view/rabbi-version-view.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [RabbiVersionComponent, RabbiVersionViewComponent],
  imports: [
    CommonModule,
    RabbiVersionRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class RabbiVersionModule {
}
