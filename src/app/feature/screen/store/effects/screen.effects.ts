import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ScreenActions } from '../actions/screen.actions';


@Injectable()
export class ScreenEffects {

  loadScreens$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ScreenActions.loadScreens),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => ScreenActions.loadScreensSuccess({ data })),
          catchError(error => of(ScreenActions.loadScreensFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
