import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private _router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url == '/login') {
      return true;
    }

    if (!localStorage.getItem('token')) {
      return this._router.parseUrl('/login');
    }

    if (localStorage.getItem('token')) {
      if (route.data['role'] != localStorage.getItem('roles')) {
        this._router.navigate(['/login']);
        return false;
      }
      return true;
    }
    return true;
  }

}
