import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TheaterService } from 'src/app/core/services/theater/theater.service';
import { DeviceListActions } from '../actions/device-list.actions';
import { DeviceService } from 'src/app/core/services/device/device.service';
import { DeviceType } from 'src/app/core/models/device';


@Injectable()
export class DeviceListEffects {

  loadTheater$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(DeviceListActions.loadTheater),
      switchMap((action) => this.theaterService.getTheater(action.id)
        .pipe(
          map(data => DeviceListActions.loadTheaterSuccess({ response: data })),
          catchError(error => of(DeviceListActions.loadTheaterFailure())))
      )
    );
  });

  loadSmartBands$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(DeviceListActions.loadSmartBands),
      switchMap((action) => this.deviceService.getDeviceList(action.theaterId, DeviceType.SMARTBAND)
        .pipe(
          map(data => DeviceListActions.loadSmartBandsSuccess({ response: data })),
          catchError(error => of(DeviceListActions.loadSmartBandsFailure())))
      )
    );
  });

  loadCashRegisters$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(DeviceListActions.loadCashRegisters),
      switchMap((action) => this.deviceService.getDeviceList(action.theaterId, DeviceType.CASHREGISTER)
        .pipe(
          map(data => DeviceListActions.loadCashRegistersSuccess({ response: data })),
          catchError(error => of(DeviceListActions.loadCashRegistersFailure())))
      )
    );
  });

  deactivateSmartband$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(DeviceListActions.deactivateSmartBand),
      switchMap((action) => this.deviceService.deactivateSmartBand(action.theaterId, action.id)
        .pipe(
          map(data => DeviceListActions.deactivateSmartBandSuccessAndReload({ theaterId: action.theaterId })),
          catchError(error => of(DeviceListActions.deactivateSmartBandFailure())))
      )
    );
  });

  setSuccessToastOnDeactivate$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(DeviceListActions.deactivateSmartBandSuccessAndReload),
      map(action => DeviceListActions.deactivateSmartBandSuccess()),
    );
  });
  reloadDevicesOnDeactivate$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(DeviceListActions.deactivateSmartBandSuccessAndReload),
      map(action => DeviceListActions.loadSmartBands({ theaterId: action.theaterId })),
    );
  });


  constructor(private actions$: Actions, 
    private theaterService: TheaterService,
    private deviceService: DeviceService) {}
}
