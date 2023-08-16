import { commonEnvironment } from './environment.common';

export const environment = {
  ...commonEnvironment,
  production: false,
  mock: false,

  apiUrl: 'http://localhost:8081/api',

  keycloakApiUrl: 'http://localhost:8090/realms/cinema-kiosk',
  redirectUri: 'http://localhost:4200/',
};
