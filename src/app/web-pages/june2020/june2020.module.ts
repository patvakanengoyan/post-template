import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {June2020ViewComponent} from './june2020-view/june2020-view.component';
import {June2020Component} from "./june2020.component";
import {June2020RoutingModule} from "./june2020-routing.module";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {TimeagoModule} from "ngx-timeago";

@NgModule({
  declarations: [June2020Component, June2020ViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    June2020RoutingModule,
    ComponentsModule,
    PaginationModule.forRoot(),
    FormsModule,
    CollapseModule.forRoot(),
    TimeagoModule.forRoot()
  ]
})
export class June2020Module {
}
