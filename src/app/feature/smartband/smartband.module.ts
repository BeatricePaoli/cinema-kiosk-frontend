import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { SmartbandComponent } from './container/smartband.component';
import { SmartbandEffects } from './store/effects/smartband.effects';
import * as fromSmartband from './store/reducers/smartband.reducer';


const routes: Routes = [
  {
    path: '',
    component: SmartbandComponent,
  },
];

@NgModule({
  declarations: [
    SmartbandComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromSmartband.smartbandFeatureKey, fromSmartband.reducer),
    EffectsModule.forFeature([SmartbandEffects])
  ]
})
export class SmartbandModule { }
