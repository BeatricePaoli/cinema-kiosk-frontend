import { Injectable } from '@angular/core';
import {
  Route,
  Router,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard {

  constructor(public auth: AuthService, public router: Router) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      if (!this.auth.isLogged()) {
        this.router.navigate(['login'], { queryParams: { 'redirectURL': this.router.url } });
        return false;
      }
      return true;
    }
}
