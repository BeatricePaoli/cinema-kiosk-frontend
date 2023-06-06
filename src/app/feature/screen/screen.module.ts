import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromScreen from './store/reducers/screen.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ScreenEffects } from './store/effects/screen.effects';
import { ScreenComponent } from './container/screen/screen.component';
import { SeatsEditorComponent } from './components/seats-editor/seats-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: ScreenComponent,
  },
];

@NgModule({
  declarations: [
    ScreenComponent,
    SeatsEditorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromScreen.screenFeatureKey, fromScreen.reducer),
    EffectsModule.forFeature([ScreenEffects]),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
    ScreenComponent,
  ]
})
export class ScreenModule { }
