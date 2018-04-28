import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../services/auth.service";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (this.authService.access_token) {
      return true;
    }

    // not logged in so redirect to login page with the nextUrl to return to current url
    this.router.navigate(['/login'], { queryParams: { nextUrl: state.url } });
    return false;
  }
}
