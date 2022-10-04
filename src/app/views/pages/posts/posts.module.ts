import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsComponent} from "./posts.component";
import {PostsRoutingModule} from "./posts-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CardModule, FormModule, GridModule, TableModule, TooltipModule} from "@coreui/angular";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ModalModule} from "ngx-bootstrap/modal";
import {DeleteModalComponent} from "../../../shared/utils/delete-modal/delete-modal.component";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [PostsComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    TableModule,
    CardModule,
    GridModule,
    FormModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AngularMultiSelectModule,
    TooltipModule,
    SharedModule
  ]
})
export class PostsModule {
}
