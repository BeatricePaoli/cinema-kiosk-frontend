import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
    MatCardModule,
  ]
})
export class MovieListModule { }
