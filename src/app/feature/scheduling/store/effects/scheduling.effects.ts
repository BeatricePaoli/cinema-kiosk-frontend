import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { SchedulingActions } from '../actions/scheduling.actions';


@Injectable()
export class SchedulingEffects {

  loadSchedulings$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SchedulingActions.loadSchedulings),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => SchedulingActions.loadSchedulingsSuccess({ data })),
          catchError(error => of(SchedulingActions.loadSchedulingsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
