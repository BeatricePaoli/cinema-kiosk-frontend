import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { TheaterListComponent } from './container/theater-list.component';
import { TheaterListEffects } from './store/effects/theater-list.effects';
import * as fromTheaterList from './store/reducers/theater-list.reducer';

const routes: Routes = [
  {
    path: '',
    component: TheaterListComponent,
  },
];

@NgModule({
  declarations: [
    TheaterListComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromTheaterList.theaterListFeatureKey, fromTheaterList.reducer),
    EffectsModule.forFeature([TheaterListEffects]),
  ]
})
export class TheaterListModule { }
