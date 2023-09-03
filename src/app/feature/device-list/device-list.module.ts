import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeviceTableComponent } from './components/device-table/device-table.component';
import { DeviceListComponent } from './container/device-list.component';
import { DeviceListEffects } from './store/effects/device-list.effects';
import * as fromDeviceList from './store/reducers/device-list.reducer';


const routes: Routes = [
  {
    path: '',
    component: DeviceListComponent,
  },
];

@NgModule({
  declarations: [
    DeviceListComponent,
    DeviceTableComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromDeviceList.deviceListFeatureKey, fromDeviceList.reducer),
    EffectsModule.forFeature([DeviceListEffects]),
    MatTabsModule,
  ]
})
export class DeviceListModule { }
