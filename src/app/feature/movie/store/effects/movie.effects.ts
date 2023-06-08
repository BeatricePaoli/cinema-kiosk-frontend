import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { MovieActions } from '../actions/movie.actions';


@Injectable()
export class MovieEffects {

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(MovieActions.loadMovies),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => MovieActions.loadMoviesSuccess({ data })),
          catchError(error => of(MovieActions.loadMoviesFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
