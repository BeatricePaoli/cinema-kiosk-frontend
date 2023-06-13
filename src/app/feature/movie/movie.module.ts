import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MovieComponent } from './container/movie.component';
import { MovieEffects } from './store/effects/movie.effects';
import * as fromMovie from './store/reducers/movie.reducer';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';



const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
  },
];

@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromMovie.movieFeatureKey, fromMovie.reducer),
    EffectsModule.forFeature([MovieEffects]),
    MatButtonModule,
    MatIconModule,
    SlickCarouselModule,
  ]
})
export class MovieModule { }
