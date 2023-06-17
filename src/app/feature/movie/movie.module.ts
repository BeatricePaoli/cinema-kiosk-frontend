import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieComponent } from './container/movie.component';
import { MovieEffects } from './store/effects/movie.effects';
import * as fromMovie from './store/reducers/movie.reducer';



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
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromMovie.movieFeatureKey, fromMovie.reducer),
    EffectsModule.forFeature([MovieEffects]),
    SlickCarouselModule,
  ]
})
export class MovieModule { }
