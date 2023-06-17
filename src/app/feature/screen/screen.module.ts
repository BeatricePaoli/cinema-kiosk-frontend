import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScreenComponent } from './container/screen/screen.component';
import { ScreenEffects } from './store/effects/screen.effects';
import * as fromScreen from './store/reducers/screen.reducer';



const routes: Routes = [
  {
    path: '',
    component: ScreenComponent,
  },
];

@NgModule({
  declarations: [
    ScreenComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromScreen.screenFeatureKey, fromScreen.reducer),
    EffectsModule.forFeature([ScreenEffects]),
  ]
})
export class ScreenModule { }
