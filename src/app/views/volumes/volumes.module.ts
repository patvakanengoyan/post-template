import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {CardModule, FormModule, GridModule, TableModule, TooltipModule} from "@coreui/angular";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ModalModule} from "ngx-bootstrap/modal";
import {SharedModule} from "../../shared/shared.module";
import {VolumesRoutingModule} from "./volumes-routing.module";
import {VolumesComponent} from "./volumes.component";

@NgModule({
  declarations: [VolumesComponent],
  imports: [
    CommonModule,
    VolumesRoutingModule,
    ReactiveFormsModule,
    TableModule,
    CardModule,
    GridModule,
    FormModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule,
    SharedModule
  ]
})
export class VolumesModule {
}
