import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {RouterModule} from "@angular/router";
import {CollapseModule} from "ngx-bootstrap/collapse";
import { HeaderSearchComponent } from './header-search/header-search.component';



@NgModule({
  declarations: [FooterComponent, HeaderComponent, HeaderSearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    RouterModule,
      CollapseModule.forRoot(),
  ],
  exports: [FooterComponent, HeaderComponent]
})
export class ComponentsModule { }
