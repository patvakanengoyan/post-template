import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteModalComponent} from "./utils/delete-modal/delete-modal.component";
import { FileInputComponent } from './utils/file-input/file-input.component';
import { PaginationComponent } from './utils/pagination/pagination.component';
import {PaginationModule} from "ngx-bootstrap/pagination";



@NgModule({
  declarations: [DeleteModalComponent, FileInputComponent, PaginationComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
  ],
  exports: [DeleteModalComponent, FileInputComponent, PaginationComponent]
})
export class SharedModule { }
