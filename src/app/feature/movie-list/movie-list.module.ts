import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieListComponent } from './container/movie-list.component';
import { MovieListEffects } from './store/effects/movie-list.effects';
import * as fromMovieList from './store/reducers/movie-list.reducer';



const routes: Routes = [
  {
    path: '',
    component: MovieListComponent,
  },
];

@NgModule({
  declarations: [
    MovieListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromMovieList.movieListFeatureKey, fromMovieList.reducer),
    EffectsModule.forFeature([MovieListEffects]),
    MatBadgeModule,
    SlickCarouselModule,
  ]
})
export class MovieListModule { }
