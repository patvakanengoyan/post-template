import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaxonomyComponent} from "./taxonomy.component";


const routes: Routes = [
  {
    path: '',
    component: TaxonomyComponent,
    data: {
      title: 'Taxonomy',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxonomyRoutingModule {}

