import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers';
import {Page404Component} from './views/pages/page404/page404.component';
import {Page500Component} from './views/pages/page500/page500.component';
import {LoginComponent} from './views/pages/login/login.component';
import {RegisterComponent} from './views/pages/register/register.component';
import {NotfoundComponent} from "./web-pages/notfound/notfound.component";
import {CanActivateService} from "./shared/guards/canActivate.service";
import {CanActivateChildService} from "./shared/guards/canActivateChild.service";
import {CanActivateFromSiteService} from "./shared/guards/can-activate-from-site.service";
import {ViewPostGuard} from "./shared/guards/view-post.guard";

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
    path: 'registration',
    loadChildren: () =>
      import('./web-pages/registration/registration.module').then((m) => m.RegistrationModule)
  },
  {
    path: 'sign-in',
    canActivate: [CanActivateFromSiteService],
    loadChildren: () =>
      import('./web-pages/sign-in/sign-in.module').then((m) => m.SignInModule)
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./web-pages/profile/profile.module').then((m) => m.ProfileModule)
  },
  {
    path: 'welcome/verify-email',
    loadChildren: () =>
      import('./web-pages/welcome/welcome.module').then((m) => m.WelcomeModule)
  },
  {
    path: 'posts/:type',
    canActivate: [ViewPostGuard],
    loadChildren: () =>
      import('./web-pages/posts/posts.module').then((m) => m.PostsModule)
  },
  {
    path: 'admin/login',
    component: LoginComponent,
    canActivate: [CanActivateService],
    data: {
      title: 'Login Page'
    }
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
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild: [CanActivateChildService],
    data: {
      title: 'Home'
    },
    children: [
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
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'admin/administrators',
        loadChildren: () =>
          import('./views/admins/admins.module').then((m) => m.AdminsModule)
      },
      {
        path: 'admin/users',
        loadChildren: () =>
          import('./views/users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'admin/taxonomy',
        loadChildren: () =>
          import('./views/taxonomy/taxonomy.module').then((m) => m.TaxonomyModule)
      },
      {
        path: 'admin/main-topics',
        loadChildren: () =>
          import('./views/main-topics/main-topics.module').then((m) => m.MainTopicsModule)
      },
      {
        path: 'admin/topics',
        loadChildren: () =>
          import('./views/topics/topics.module').then((m) => m.TopicsModule)
      },
      {
        path: 'admin/volumes',
        loadChildren: () =>
          import('./views/volumes/volumes.module').then((m) => m.VolumesModule)
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
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
