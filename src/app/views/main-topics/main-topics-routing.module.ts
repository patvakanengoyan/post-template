import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainTopicsComponent} from "./main-topics.component";


const routes: Routes = [
  {
    path: '',
    component: MainTopicsComponent,
    data: {
      title: 'Main topics',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainTopicsRoutingModule {}

