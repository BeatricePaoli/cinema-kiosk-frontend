import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeviceListComponent } from './container/device-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DeviceListEffects } from './store/effects/device-list.effects';
import * as fromDeviceList from './store/reducers/device-list.reducer';
import { DeviceTableComponent } from './components/device-table/device-table.component';


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
