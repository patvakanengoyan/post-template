import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AcademicComponent} from "./academic.component";
import {AcademicViewComponent} from "./academic-view/academic-view.component";


const routes: Routes = [
  {
    path: '',
    component: AcademicComponent,
    data: {
      title: 'Academic',
    },
  },
  {
    path: ':id',
    component: AcademicViewComponent,
    data: {
      title: 'Academic View',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicRoutingModule {}

