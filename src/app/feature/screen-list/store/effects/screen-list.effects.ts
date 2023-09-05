import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ScreenListActions } from '../actions/screen-list.actions';


@Injectable()
export class ScreenListEffects {

  loadScreenLists$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ScreenListActions.loadScreenLists),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => ScreenListActions.loadScreenListsSuccess({ data })),
          catchError(error => of(ScreenListActions.loadScreenListsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
