import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteModalComponent} from "./utils/delete-modal/delete-modal.component";
import { FileInputComponent } from './utils/file-input/file-input.component';
import { PaginationComponent } from './utils/pagination/pagination.component';
import {PaginationModule} from "ngx-bootstrap/pagination";
import { LoginModalComponent } from './utils/login-modal/login-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap/modal";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [DeleteModalComponent, FileInputComponent, PaginationComponent, LoginModalComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule
  ],
  exports: [DeleteModalComponent, FileInputComponent, PaginationComponent, LoginModalComponent]
})
export class SharedModule { }
