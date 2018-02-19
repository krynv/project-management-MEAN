import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    redirectUrl;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }


    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.loggedIn()) { // check if the user is logged in
            return true;
        } else {
            this.redirectUrl = state.url;
            this.router.navigate(['/login']); // if not, tell them to log in before accessing any page
            return false;
        }
    }
}