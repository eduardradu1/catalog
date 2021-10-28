import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { StateService } from '../state.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private loginState:StateService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.loginState.changeLoginMessage(this.authService.isLoggedIn);
    if(this.authService.isLoggedIn !== true) {
      this.router.navigate(['log-in'])
    }
    return true;
  }
}
