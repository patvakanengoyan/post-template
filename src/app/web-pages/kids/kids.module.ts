import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {KidsComponent} from "./kids.component";
import {KidsRoutingModule} from "./kids-routing.module";
import { KidsViewComponent } from './kids-view/kids-view.component';
import {AccordionModule} from "ngx-bootstrap/accordion";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {CollapseModule} from "ngx-bootstrap/collapse";

@NgModule({
  declarations: [KidsComponent, KidsViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KidsRoutingModule,
    ComponentsModule,
    PaginationModule.forRoot(),
    FormsModule,
    CollapseModule.forRoot(),
  ]
})
export class KidsModule {
}
