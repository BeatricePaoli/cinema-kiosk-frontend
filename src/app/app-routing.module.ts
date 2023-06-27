import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movie-list',
    pathMatch: 'full',
  },
  {
    path: 'movie-list',
    loadChildren: () =>
      import('./feature/movie-list/movie-list.module').then(
        (m) => m.MovieListModule
      ),
  },
  {
    path: 'movie-list/:movieId',
    loadChildren: () =>
      import('./feature/movie/movie.module').then(
        (m) => m.MovieModule
      ),
  },
  {
    path: 'booking-form/:movieId',
    loadChildren: () =>
      import('./feature/booking-form/booking-form.module').then(
        (m) => m.BookingFormModule
      ),
  },
  {
    path: 'booking-list',
    loadChildren: () =>
      import('./feature/booking-list/booking-list.module').then(
        (m) => m.BookingListModule
      ),
  },
  {
    path: 'booking-list/:bookingId',
    loadChildren: () =>
      import('./feature/booking/booking.module').then(
        (m) => m.BookingModule
      ),
  },
  {
    path: 'theater-list',
    loadChildren: () =>
      import('./feature/theater-list/theater-list.module').then(
        (m) => m.TheaterListModule
      ),
  },
  {
    path: 'theater-list/:theaterId',
    loadChildren: () =>
      import('./feature/theater/theater.module').then(
        (m) => m.TheaterModule
      ),
  },
  {
    path: 'theater-list/:theaterId/screen-list/:screenId',
    loadChildren: () =>
      import('./feature/screen/screen.module').then(
        (m) => m.ScreenModule
      ),
  },
  {
    path: 'theater-list/:theaterId/scheduling',
    loadChildren: () =>
      import('./feature/scheduling/scheduling.module').then(
        (m) => m.SchedulingModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./feature/error/error.module').then(
        (m) => m.ErrorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
