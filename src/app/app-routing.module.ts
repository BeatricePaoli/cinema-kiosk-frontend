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
    path: 'booking/:movieId',
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
    path: 'screen',
    loadChildren: () =>
      import('./feature/screen/screen.module').then(
        (m) => m.ScreenModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
