import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TopicKeysComponent} from "./topic-keys.component";


const routes: Routes = [
  {
    path: '',
    component: TopicKeysComponent,
    data: {
      title: 'TopicKeys',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicKeysRoutingModule {}

