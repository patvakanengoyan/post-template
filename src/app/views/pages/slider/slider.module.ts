import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CardModule, FormModule, GridModule, TableModule} from "@coreui/angular";
import {SliderComponent} from "./slider.component";
import {SliderRoutingModule} from "./slider-routing.module";
import {PaginationModule} from "ngx-bootstrap/pagination";

@NgModule({
  declarations: [SliderComponent],
  imports: [
    CommonModule,
    SliderRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    TableModule,
    CardModule,
    GridModule,
    FormModule,
    PaginationModule.forRoot()
  ]
})
export class SliderModule {
}
