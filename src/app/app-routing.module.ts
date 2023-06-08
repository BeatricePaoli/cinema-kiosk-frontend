import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// TODO: evitare ripetizioni
const routes: Routes = [
  {
    path: '',
    redirectTo: 'screen',
    pathMatch: 'full',
  },
  {
    path: 'movie-list-now',
    loadChildren: () =>
      import('./feature/movie-list/movie-list.module').then(
        (m) => m.MovieListModule
      ),
  },
  {
    path: 'movie-list-now/:movieId',
    loadChildren: () =>
      import('./feature/movie/movie.module').then(
        (m) => m.MovieModule
      ),
  },
  {
    path: 'movie-list-next',
    loadChildren: () =>
      import('./feature/movie-list/movie-list.module').then(
        (m) => m.MovieListModule
      ),
  },
  {
    path: 'movie-list-next/:movieId',
    loadChildren: () =>
      import('./feature/movie/movie.module').then(
        (m) => m.MovieModule
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
