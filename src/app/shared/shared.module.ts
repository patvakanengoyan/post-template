import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteModalComponent} from "./utils/delete-modal/delete-modal.component";
import { FileInputComponent } from './utils/file-input/file-input.component';



@NgModule({
  declarations: [DeleteModalComponent, FileInputComponent],
  imports: [
    CommonModule
  ],
  exports: [DeleteModalComponent, FileInputComponent]
})
export class SharedModule { }
