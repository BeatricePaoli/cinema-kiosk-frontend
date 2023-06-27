import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulingComponent } from './container/scheduling.component';
import { SchedulingEffects } from './store/effects/scheduling.effects';
import * as fromScheduling from './store/reducers/scheduling.reducer';


const routes: Routes = [
  {
    path: '',
    component: SchedulingComponent,
  },
];

@NgModule({
  declarations: [
    SchedulingComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromScheduling.schedulingFeatureKey, fromScheduling.reducer),
    EffectsModule.forFeature([SchedulingEffects])
  ]
})
export class SchedulingModule { }
