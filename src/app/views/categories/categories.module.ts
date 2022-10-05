import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CardModule, FormModule, GridModule, TableModule, TooltipModule} from "@coreui/angular";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ModalModule} from "ngx-bootstrap/modal";
import {SharedModule} from "../../shared/shared.module";
import {CategoriesRoutingModule} from "./categories-routing.module";
import {CategoriesComponent} from "./categories.component";

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    TableModule,
    CardModule,
    GridModule,
    FormModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule,
    SharedModule,
  ]
})
export class CategoriesModule {
}
