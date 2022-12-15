import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, CanActivate, CanActivateChild, Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class CanActivateChildFromSiteService implements CanActivate {

  constructor(private router: Router,
              public activeRoute: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: any,) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('site_access_token')) {
      return true;
    }
    this.router.navigateByUrl('sign-in');
    return false;
  }
}
