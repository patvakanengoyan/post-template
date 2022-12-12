import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {PostsRoutingModule} from "./posts-routing.module";
import {PostsComponent} from "./posts.component";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {TimeagoModule} from "ngx-timeago";
import { PostViewComponent } from './post-view/post-view.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [PostsComponent, PostViewComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    PaginationModule.forRoot(),
    FormsModule,
    CollapseModule.forRoot(),
    TimeagoModule.forRoot(),
    SharedModule
  ]
})
export class PostsModule {
}
