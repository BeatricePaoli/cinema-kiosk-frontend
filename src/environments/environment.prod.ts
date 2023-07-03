import { commonEnvironment } from './environment.common';
// Da cambiare con gli endpoint online
const baseUrl = 'http://localhost:8081/api';

export const environment = {
  ...commonEnvironment,
  production: false,

  apiUrl: baseUrl,
  adminApiUrl: baseUrl + '/admin',

  keycloakApiUrl: 'http://localhost:8080/auth/realms/master',
  redirectUri: 'http://localhost:4200/',
};
