import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {KidsComponent} from "./kids.component";
import {KidsRoutingModule} from "./kids-routing.module";
import { KidsViewComponent } from './kids-view/kids-view.component';

@NgModule({
  declarations: [KidsComponent, KidsViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KidsRoutingModule,
    ComponentsModule
  ]
})
export class KidsModule {
}
