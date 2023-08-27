import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanMatch } from '@angular/router';
import { AuthGuard } from './core/guard/auth/auth.guard';
import { Role } from './core/models/role';
import { RolesGuard } from './core/guard/roles/roles.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movie-list',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./feature/login/login.module').then(
        (m) => m.LoginModule
      ),
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
    canMatch: mapToCanMatch([AuthGuard]),
    loadChildren: () =>
      import('./feature/booking-form/booking-form.module').then(
        (m) => m.BookingFormModule
      ),
  },
  {
    path: 'booking-list',
    canMatch: mapToCanMatch([AuthGuard]),
    loadChildren: () =>
      import('./feature/booking-list/booking-list.module').then(
        (m) => m.BookingListModule
      ),
  },
  {
    path: 'booking-list/:bookingId',
    canMatch: mapToCanMatch([AuthGuard]),
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
    path: 'cash-desk',
    loadChildren: () =>
      import('./feature/cash-desk/cash-desk.module').then(
        (m) => m.CashDeskModule
      ),
  },
  {
    path: 'booking-validator',
    canMatch: mapToCanMatch([AuthGuard, RolesGuard]),
    loadChildren: () =>
      import('./feature/booking-validator/booking-validator.module').then(
        (m) => m.BookingValidatorModule
      ),
    data: { role: [ Role.CASHIER ] }
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./feature/error/error.module').then(
        (m) => m.ErrorModule
      ),
  },
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
