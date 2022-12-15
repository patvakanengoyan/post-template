import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CanActivateChildFromSiteService} from "../../shared/guards/can-activate-child-from-site.service";
import {ProfileComponent} from "./profile.component";


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      title: 'Profile',
    },
    canActivateChild: [CanActivateChildFromSiteService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}

