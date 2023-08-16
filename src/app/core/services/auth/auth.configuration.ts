import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../../../environments/environment';

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.keycloakApiUrl,
  redirectUri: window.location.origin + '/login',
  postLogoutRedirectUri: window.location.origin + '/',
  clientId: 'cinema-kiosk-app',
  responseType: 'code',
  scope: 'openid profile email offline_access',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
};
