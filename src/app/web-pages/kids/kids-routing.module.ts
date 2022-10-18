import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {KidsComponent} from "./kids.component";
import {KidsViewComponent} from "./kids-view/kids-view.component";


const routes: Routes = [
  {
    path: '',
    component: KidsComponent,
    data: {
      title: 'Kids Click',
    },
  },
  {
    path: ':id',
    component: KidsViewComponent,
    data: {
      title: 'Kids Click',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KidsRoutingModule {}

