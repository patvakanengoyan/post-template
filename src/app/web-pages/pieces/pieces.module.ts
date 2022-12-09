import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {PiecesRoutingModule} from "./pieces-routing.module";
import {PiecesComponent} from "./pieces.component";
import {PiecesViewComponent} from "./pieces-view/pieces-view.component";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {CollapseModule} from "ngx-bootstrap/collapse";

@NgModule({
  declarations: [PiecesComponent, PiecesViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PiecesRoutingModule,
    ComponentsModule,
    PaginationModule.forRoot(),
    FormsModule,
    CollapseModule.forRoot(),
  ]
})
export class PiecesModule {
}
