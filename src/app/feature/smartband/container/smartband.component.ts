import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of, take } from 'rxjs';
import { Device, DeviceActivity, DeviceActivityEvent } from 'src/app/core/models/device';
import { Toast } from 'src/app/core/models/toast';
import * as RouterSelectors from 'src/app/core/router/router.selectors';
import * as SmartBandSelectors from '../store/selectors/smartband.selectors';
import { SmartbandActions } from '../store/actions/smartband.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-smartband',
  templateUrl: './smartband.component.html',
  styleUrls: ['./smartband.component.scss']
})
export class SmartbandComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  theaterId?: number;
  smartBand: Device | null = null;

  activities: DeviceActivity[] = [];

  displayedColumns: string[] = ['tms', 'user', 'eventCode', 'emitterSerial', 'product', 'quantity'];
  dataSource: MatTableDataSource<DeviceActivity> = new MatTableDataSource<DeviceActivity>([]);

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  subs: Subscription[] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.theaterId && params.deviceId) {
        const theaterId = parseInt(params.theaterId);
        const id = parseInt(params.deviceId);
        if (!Number.isNaN(theaterId) && !Number.isNaN(id)) {
          this.theaterId = theaterId;
          this.store.dispatch(SmartbandActions.loadSmartBand({ theaterId, id }));
          this.store.dispatch(SmartbandActions.loadActivities({ theaterId, id }));
        }
      }
    });

    this.subs.push(this.store.select(SmartBandSelectors.selectSmartband).subscribe(smartband => {
      this.smartBand = smartband;
    }));

    this.subs.push(this.store.select(SmartBandSelectors.selectActivities).subscribe(activities => {
      this.activities = activities;
      this.initTable();
    }));

    this.isLoading$ = this.store.select(SmartBandSelectors.selectIsLoading);
    this.toast$ = this.store.select(SmartBandSelectors.selectToast);
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.activities);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  getEventLabel(event: DeviceActivityEvent) {
    switch (event) {
      case DeviceActivityEvent.ACTIVATION:
        return 'ATTIVAZIONE';
      case DeviceActivityEvent.DEACTIVATION:
        return 'DISATTIVAZIONE';
      case DeviceActivityEvent.ENTERED_BAR:
        return 'UTENTE AL BAR';
      case DeviceActivityEvent.WRONG_ROOM:
        return 'UTENTE NELLA SALA SBAGLIATE';
      case DeviceActivityEvent.ROOM_CHANGE:
        return 'CAMBIO STANZA';
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
