import { Injectable} from '@angular/core';
import { CanActivate,  Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

    constructor(private router: Router) {

    }
    /*check user is logged in admin panel or not*/
    canActivate(): boolean {
            if (localStorage.getItem('access_token')) {
                this.router.navigateByUrl(`admin/posts`);
                return false;
            }
        return true;
    }
}
