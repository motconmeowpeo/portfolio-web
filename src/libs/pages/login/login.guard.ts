import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthFacade } from '../../core/services/auth/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Your logic to determine if the route can be activated

    return this.authFacade.isAuthenticated().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['home']);
          return false;
        }
        return true;
      })
    );
  }
}
