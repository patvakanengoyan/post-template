import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from '@angular/router';

@Injectable()
export class CanActivateFromSiteService implements CanActivate {

  constructor(private router: Router,
              public activeRoute: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: any,) {

  }

  canActivate(): boolean {
    if (localStorage.getItem('site_access_token')) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
