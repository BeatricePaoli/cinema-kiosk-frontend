import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of, take } from 'rxjs';
import { Theater } from 'src/app/core/models/theater';
import { Toast } from 'src/app/core/models/toast';
import * as RouterSelectors from 'src/app/core/router/router.selectors';
import { DeviceListActions } from '../store/actions/device-list.actions';
import { Store } from '@ngrx/store';
import * as DeviceListSelectors from '../store/selectors/device-list.selectors';
import { Device } from 'src/app/core/models/device';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit, OnDestroy {

  theaterId?: number;
  theater: Theater | null = null;

  smartbands: Device[] = [];
  cashRegisters: Device[] = [];

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  subs: Subscription[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.theaterId) {
        const id = parseInt(params.theaterId);
        if (!Number.isNaN(id)) {
          this.theaterId = id;
          this.store.dispatch(DeviceListActions.loadTheater({ id }));
          this.store.dispatch(DeviceListActions.loadSmartBands({ theaterId: id }));
          this.store.dispatch(DeviceListActions.loadCashRegisters({ theaterId: id }));
        }
      }
    });

    this.subs.push(this.store.select(DeviceListSelectors.selectTheater).subscribe(theater => {
      this.theater = theater;
    }));

    this.subs.push(this.store.select(DeviceListSelectors.selectSmartBands).subscribe(devices => {
      this.smartbands = devices;
    }));

    this.subs.push(this.store.select(DeviceListSelectors.selectCashRegisters).subscribe(devices => {
      this.cashRegisters = devices;
    }));

    this.isLoading$ = this.store.select(DeviceListSelectors.selectIsLoading);
    this.toast$ = this.store.select(DeviceListSelectors.selectToast);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onTurnOffBandClicked(device: Device) {
    this.store.dispatch(DeviceListActions.deactivateSmartBand({ id: device.id, theaterId: this.theaterId! }));
    // const index = this.smartbands.findIndex(t => t.id === device.id);
    // if (index > -1) {
    //   this.smartbands[index].isActive = false;
    //   this.smartbands.splice(index, 1, this.smartbands[index]);
    // }
  }

  onCancelBandClicked(device: Device) {
    // const index = this.smartbands.findIndex(t => t.id === device.id);
    // if (index > -1) {
    //   this.smartbands.splice(index, 1);
    //   this.smartbands = [...this.smartbands];
    // }
  }

  onCancelRegisterClicked(device: Device) {
    // const index = this.cashRegisters.findIndex(t => t.id === device.id);
    // if (index > -1) {
    //   this.cashRegisters.splice(index, 1);
    //   this.cashRegisters = [...this.cashRegisters];
    // }
  }

}
