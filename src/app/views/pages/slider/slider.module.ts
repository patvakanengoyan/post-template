import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {CardModule, FormModule, GridModule, TableModule, TooltipModule} from "@coreui/angular";
import {SliderComponent} from "./slider.component";
import {SliderRoutingModule} from "./slider-routing.module";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ModalModule} from "ngx-bootstrap/modal";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  declarations: [SliderComponent],
  imports: [
    CommonModule,
    SliderRoutingModule,
    ReactiveFormsModule,
    TableModule,
    CardModule,
    GridModule,
    FormModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule,
    SharedModule
  ]
})
export class SliderModule {
}
