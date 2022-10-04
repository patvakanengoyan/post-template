import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsComponent} from "./posts.component";
import {PostsRoutingModule} from "./posts-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CardModule, FormModule, GridModule, TableModule} from "@coreui/angular";
import {PaginationModule} from "ngx-bootstrap/pagination";


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
    PaginationModule.forRoot()
  ]
})
export class PostsModule {
}
