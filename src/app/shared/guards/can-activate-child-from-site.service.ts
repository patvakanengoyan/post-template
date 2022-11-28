import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, CanActivateChild, Router} from '@angular/router';
import {isPlatformBrowser} from "@angular/common";

@Injectable()
export class CanActivateChildFromSiteService implements CanActivateChild {

  constructor(private router: Router,
              public activeRoute: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: any,) {
  }

  canActivateChild(): boolean {
    if (localStorage.getItem('site_access_token')) {
      return true;
    }
    this.router.navigateByUrl('sign-in');
    return false;
  }
}
