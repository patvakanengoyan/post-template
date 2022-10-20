import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {CardModule, FormModule, GridModule, TableModule, TooltipModule} from "@coreui/angular";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ModalModule} from "ngx-bootstrap/modal";
import {SharedModule} from "../../shared/shared.module";
import {UsersRoutingModule} from "./users-routing.module";
import {UsersComponent} from "./users.component";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
export class UsersModule {
}
