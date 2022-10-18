import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../components/components.module";
import {PiecesRoutingModule} from "./pieces-routing.module";
import {PiecesComponent} from "./pieces.component";
import {PiecesViewComponent} from "./pieces-view/pieces-view.component";

@NgModule({
  declarations: [PiecesComponent, PiecesViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PiecesRoutingModule,
    ComponentsModule
  ]
})
export class PiecesModule {
}
