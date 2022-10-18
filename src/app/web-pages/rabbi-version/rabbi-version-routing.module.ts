import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RabbiVersionComponent} from "./rabbi-version.component";
import {RabbiVersionViewComponent} from "./rabbi-version-view/rabbi-version-view.component";


const routes: Routes = [
  {
    path: '',
    component: RabbiVersionComponent,
    data: {
      title: 'Rabbi Version',
    },
  },
  {
    path: ':id',
    component: RabbiVersionViewComponent,
    data: {
      title: 'Rabbi Version',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RabbiVersionRoutingModule {}

