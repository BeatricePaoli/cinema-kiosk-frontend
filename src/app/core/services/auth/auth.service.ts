import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { authCodeFlowConfig } from './auth.configuration';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private roles$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private oauthService: OAuthService,
    private router: Router,
  ) {}

  public configure() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.setStorage(sessionStorage);

    this.runInitialLoginSequence();
    this.getRolesFromStorage();
  }

  public isLogged() {
    this.getRolesFromStorage();
    return (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    );
  }

  public logout() {
    localStorage.removeItem('roles');
    this.setRoles([]);
    this.oauthService.logOut();
    // TODO: cambiare endpoint per vari ruoli?
    this.router.navigate(['']);
  }

  public runInitialLoginSequence(): Promise<void> {
    return this.oauthService
      .loadDiscoveryDocumentAndLogin()
      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          const obj: any = this.oauthService.getIdentityClaims();
          const roles = obj.roles ? obj.roles : [];
          
          localStorage.setItem('roles', JSON.stringify(roles));
          this.setRoles(roles);

          return Promise.resolve();
        }
        this.setRoles([]);

        return Promise.reject();
      })

      .then(() => {
        console.log("serv", this.oauthService.state)
        if (window.location.href.includes('login')) {
          // TODO: da cambiare a seconda dei ruoli
          this.router.navigate(['']);
        } else {
          let url = window.location.pathname;
          if (decodeURIComponent(window.location.search)) {
            url = url + decodeURIComponent(window.location.search);
          }
          this.router.navigateByUrl(url);
        }
      })
      .catch(() => console.log('errore'));
  }

  setRoles(roles: string[]) {
    this.roles$.next(roles);
  }

  getRoles() {
    return this.roles$.asObservable();
  }

  getRolesFromStorage() {
    const roles = localStorage.getItem('roles');
    if (roles) {
      this.setRoles(JSON.parse(roles));
    }
  }
}
