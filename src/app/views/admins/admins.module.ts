import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {CardModule, FormModule, GridModule, TableModule, TooltipModule} from "@coreui/angular";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ModalModule} from "ngx-bootstrap/modal";
import {SharedModule} from "../../shared/shared.module";
import {AdminsComponent} from "./admins.component";
import {AdminsRoutingModule} from "./admins-routing.module";
@NgModule({
  declarations: [AdminsComponent],
  imports: [
    CommonModule,
    AdminsRoutingModule,
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
export class AdminsModule {
}
