const baseUrl = 'http://localhost:8081/api';

export const commonEnvironment = {
    production: false,
    mock: false,

    apiUrl: baseUrl,
    adminApiUrl: baseUrl + '/admin',

    keycloakApiUrl: 'http://localhost:8080/auth/realms/master',
    redirectUri: 'http://localhost:4200/',

    movies: '/movies',
    movie: '/movies/{id}',
    theaterFilter: '/theater/filter',
};