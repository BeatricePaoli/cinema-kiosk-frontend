import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './container/movie.component';
import { StoreModule } from '@ngrx/store';
import * as fromMovie from './store/reducers/movie.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './store/effects/movie.effects';



@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromMovie.movieFeatureKey, fromMovie.reducer),
    EffectsModule.forFeature([MovieEffects])
  ]
})
export class MovieModule { }
