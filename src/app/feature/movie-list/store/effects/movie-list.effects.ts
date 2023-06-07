import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { MovieListActions } from '../actions/movie-list.actions';


@Injectable()
export class MovieListEffects {

  loadMovieLists$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(MovieListActions.loadMovieLists),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => MovieListActions.loadMovieListsSuccess({ data })),
          catchError(error => of(MovieListActions.loadMovieListsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
