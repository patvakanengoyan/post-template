import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {AcademicComponent} from "./academic.component";
import {AcademicRoutingModule} from "./academic-routing.module";
import { AcademicViewComponent } from './academic-view/academic-view.component';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {CollapseModule} from "ngx-bootstrap/collapse";

@NgModule({
  declarations: [AcademicComponent, AcademicViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AcademicRoutingModule,
    ComponentsModule,
    PaginationModule.forRoot(),
    FormsModule,
    CollapseModule.forRoot(),
  ]
})
export class AcademicModule {
}
