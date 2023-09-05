import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScreenListComponent } from './container/screen-list.component';
import { ScreenListEffects } from './store/effects/screen-list.effects';
import * as fromScreenList from './store/reducers/screen-list.reducer';


const routes: Routes = [
  {
    path: '',
    component: ScreenListComponent,
  },
];

@NgModule({
  declarations: [
    ScreenListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromScreenList.screenListFeatureKey, fromScreenList.reducer),
    EffectsModule.forFeature([ScreenListEffects])
  ]
})
export class ScreenListModule { }
