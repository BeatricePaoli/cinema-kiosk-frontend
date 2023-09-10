import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SmartbandActions } from '../actions/smartband.actions';
import { DeviceService } from 'src/app/core/services/device/device.service';


@Injectable()
export class SmartbandEffects {

  loadSmartBand$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SmartbandActions.loadSmartBand),
      switchMap((action) => this.deviceService.getDevice(action.id)
        .pipe(
          map(data => SmartbandActions.loadSmartBandSuccess({ response: data })),
          catchError(error => of(SmartbandActions.loadSmartBandFailure())))
      )
    );
  });

  loadTheaterList$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SmartbandActions.loadActivities),
      switchMap((action) => this.deviceService.getDeviceActivities(action.id)
        .pipe(
          map(data => SmartbandActions.loadActivitiesSuccess({ response: data })),
          catchError(error => of(SmartbandActions.loadActivitiesFailure())))
      )
    );
  });


  constructor(private actions$: Actions, private deviceService: DeviceService) {}
}
