export const commonEnvironment = {
    production: false,
    mock: false,

    movies: '/movies',
    movie: '/movies/{id}',
    
    theaters: '/theaters',
    theater: '/theaters/{id}',
    theaterFilter: '/theaters/filter',
    
    ticketTypes: '/theaters/{id}/tickets',

    devices: '/devices/filter',
    device: '/devices/{id}',
    deviceActivities: '/devices/{id}/activities',

    shows: '/shows/filter',

    bookings: '/bookings',
    booking: '/bookings/{id}',
};