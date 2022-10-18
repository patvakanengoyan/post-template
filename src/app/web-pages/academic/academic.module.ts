import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {AcademicComponent} from "./academic.component";
import {AcademicRoutingModule} from "./academic-routing.module";
import { AcademicViewComponent } from './academic-view/academic-view.component';

@NgModule({
  declarations: [AcademicComponent, AcademicViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AcademicRoutingModule,
    ComponentsModule
  ]
})
export class AcademicModule {
}
