import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';

import { AuthLoadGuard } from './authLoad.guard';

describe('AuthLoadGuardService', () => {
  let service: AuthLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthLoadGuard, OAuthService, UrlHelperService, OAuthLogger ]
    });
    service = TestBed.inject(AuthLoadGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
