import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from "./posts.component";
import {PostViewComponent} from "./post-view/post-view.component";


const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    data: {
      title: 'Posts',
    },
  },
  {
    path: ':id',
    component: PostViewComponent,
    data: {
      title: 'posts',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}

