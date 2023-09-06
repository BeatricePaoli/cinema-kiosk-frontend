export const commonEnvironment = {
    production: false,
    mock: false,

    movies: '/movies',
    movie: '/movies/{id}',
    
    theaters: '/theaters',
    theater: '/theaters/{id}',
    theaterFilter: '/theaters/filter',
    ticketTypes: '/theaters/{id}/tickets',

    shows: '/shows/filter',

    bookings: '/bookings',
    booking: '/bookings/{id}',
};