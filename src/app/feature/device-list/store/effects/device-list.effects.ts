import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { DeviceListActions } from '../actions/device-list.actions';


@Injectable()
export class DeviceListEffects {

  loadDeviceLists$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(DeviceListActions.loadDeviceLists),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => DeviceListActions.loadDeviceListsSuccess({ data })),
          catchError(error => of(DeviceListActions.loadDeviceListsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
