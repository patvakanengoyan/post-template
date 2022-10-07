import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SinglePostComponent} from "./single-post.component";


const routes: Routes = [
  {
    path: '',
    component: SinglePostComponent,
    data: {
      title: 'Single-post',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinglePostRoutingModule {}

