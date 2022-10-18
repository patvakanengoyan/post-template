import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PiecesViewComponent} from "./pieces-view/pieces-view.component";
import {PiecesComponent} from "./pieces.component";


const routes: Routes = [
  {
    path: '',
    component: PiecesComponent,
    data: {
      title: 'Pieces',
    },
  },
  {
    path: ':id',
    component: PiecesViewComponent,
    data: {
      title: 'Pieces',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PiecesRoutingModule {}

