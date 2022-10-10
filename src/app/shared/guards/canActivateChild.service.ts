import { Injectable} from '@angular/core';
import { CanActivateChild, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateChildService implements CanActivateChild {

    constructor(private router: Router) {

    }
    /*check user is logged in admin panel or not*/
    canActivateChild(): boolean {
            if (localStorage.getItem('access_token')) {
                return true;
            }
        this.router.navigateByUrl('login');
        return false;
    }
}
