import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TheaterActions } from '../actions/theater.actions';


@Injectable()
export class TheaterEffects {

  loadTheaters$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TheaterActions.loadTheaters),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => TheaterActions.loadTheatersSuccess({ data })),
          catchError(error => of(TheaterActions.loadTheatersFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
