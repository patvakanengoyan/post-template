import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./sign-in.component";
import {CanActivateChildFromSiteService} from "../../shared/guards/can-activate-child-from-site.service";


const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
    data: {
      title: 'Sign In',
    },
    canActivateChild: [CanActivateChildFromSiteService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignInRoutingModule {}

