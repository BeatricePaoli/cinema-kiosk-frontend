import { Injectable } from '@angular/core';
import {
  Route,
  Router,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RolesGuard {

  constructor(public router: Router) { }

  canMatch(route: Route, segments: UrlSegment[]):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      const rolePermitted = route.data ? route.data['role'] : [];
      const roles = localStorage.getItem('roles');

      if (rolePermitted.filter((r: any) => roles?.includes(r)).length > 0) {
        return true;
      }
      return false;
  }
}
