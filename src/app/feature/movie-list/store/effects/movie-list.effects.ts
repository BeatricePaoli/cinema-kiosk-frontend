import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { MovieListActions } from '../actions/movie-list.actions';
import { MovieService } from 'src/app/core/services/movie/movie.service';
import { TheaterService } from 'src/app/core/services/theater/theater.service';


@Injectable()
export class MovieListEffects {

  loadMovieLists$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(MovieListActions.loadMovieList),
      switchMap((action) => this.movieService.searchMovies(action.filter)
        .pipe(
          map(data => MovieListActions.loadMovieListSuccess({ response: data })),
          catchError(error => of(MovieListActions.loadMovieListFailure())))
      )
    );
  });


  loadFilter$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(MovieListActions.loadFilter),
      switchMap(() => this.theaterService.getFilters()
        .pipe(
          map(data => MovieListActions.loadFilterSuccess({ response: data })),
          catchError(error => of(MovieListActions.loadFilterFailure())))
      )
    );
  });


  constructor(private actions$: Actions, 
    private movieService: MovieService,
    private theaterService: TheaterService) {}
}
