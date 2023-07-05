
const baseUrl = '';

export const environment = {
  production: false,
  mock: true,

  apiUrl: baseUrl,
  adminApiUrl: baseUrl + '/admin',

  keycloakApiUrl: 'http://localhost:8080/auth/realms/master',
  redirectUri: 'http://localhost:4200/',

  movies: '/assets/mocks/movie-list.json',
  movie: '/assets/mocks/movie.json',
  theaterFilter: '/assets/mocks/theater-filter.json',
};
