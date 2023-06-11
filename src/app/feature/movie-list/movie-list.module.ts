import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SlickCarouselModule } from 'ngx-slick-carousel';
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
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromMovieList.movieListFeatureKey, fromMovieList.reducer),
    EffectsModule.forFeature([MovieListEffects]),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatBadgeModule,
    SlickCarouselModule,
  ]
})
export class MovieListModule { }
