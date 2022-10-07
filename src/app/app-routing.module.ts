import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import {NotfoundComponent} from "./web-pages/notfound/notfound.component";
import {CanActivateService} from "./shared/guards/canActivate.service";
import {CanActivateChildService} from "./shared/guards/canActivateChild.service";

const routes: Routes = [
    {
      path: 'home',
      loadChildren: () =>
        import('./web-pages/home/home.module').then((m) => m.HomeModule)
    },
    {
        path: '',
        loadChildren: () =>
          import('./web-pages/home/home.module').then((m) => m.HomeModule)
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [CanActivateService],
      data: {
        title: 'Login Page'
      }
    },
    {
        path: 'post/:id',
        loadChildren: () =>
        import('./web-pages/single-post/single-post.module').then((m) => m.SinglePostModule)
    },
    {
        path: 'about',
        loadChildren: () =>
        import('./web-pages/about/about.module').then((m) => m.AboutModule)
    },
    {
        path: 'contact',
        loadChildren: () =>
        import('./web-pages/contact/contact.module').then((m) => m.ContactModule)
    },
    // {
    //   path: '',
    //   redirectTo: 'admin/dashboard',
    //   pathMatch: 'full'
    // },
    {
      path: '',
      component: DefaultLayoutComponent,
      canActivateChild: [CanActivateChildService],
      data: {
        title: 'Home'
      },
      children: [
        {
          path: 'admin/dashboard',
          loadChildren: () =>
            import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
        },
        {
          path: 'admin/posts',
          loadChildren: () =>
            import('./views/posts/posts.module').then((m) => m.PostsModule)
        },
        {
          path: 'admin/slider',
          loadChildren: () =>
            import('./views/slider/slider.module').then((m) => m.SliderModule)
        },
        {
          path: 'admin/category',
          loadChildren: () =>
            import('./views/categories/categories.module').then((m) => m.CategoriesModule)
        },
        {
          path: 'pages',
          loadChildren: () =>
            import('./views/pages/pages.module').then((m) => m.PagesModule)
        },
    ]
  },
  {
    path: 'admin/404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'admin/500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', component: NotfoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      // anchorScrolling: 'enabled',
      // initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
