import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewPostGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.params['type'] == 'kids' || route.params['type'] == 'academic' || route.params['type'] == 'pieces' || route.params['type'] == 'june2020') {
      return true;
    }
    this.router.navigateByUrl(`/404`);
    return false;
  }

}
