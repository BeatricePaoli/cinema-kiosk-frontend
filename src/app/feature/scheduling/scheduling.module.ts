import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchedulingComponent } from './container/scheduling.component';
import { SchedulingEffects } from './store/effects/scheduling.effects';
import * as fromScheduling from './store/reducers/scheduling.reducer';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorListModalComponent } from './components/error-list-modal/error-list-modal.component';


const routes: Routes = [
  {
    path: '',
    component: SchedulingComponent,
  },
];

@NgModule({
  declarations: [
    SchedulingComponent,
    ErrorListModalComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromScheduling.schedulingFeatureKey, fromScheduling.reducer),
    EffectsModule.forFeature([SchedulingEffects]),
    MatDatepickerModule,
  ]
})
export class SchedulingModule { }
