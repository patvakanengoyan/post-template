import { Injectable} from '@angular/core';
import { CanActivate,  Router} from '@angular/router';

@Injectable()
export class CanActivateService implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(): boolean {
            if (localStorage.getItem('access_token')) {
                this.router.navigateByUrl(`/dashboard`);
                return false;
            }
        return true;
    }
}
