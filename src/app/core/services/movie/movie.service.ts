import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, MovieFilter, MovieSearchResponse } from '../../models/movie';
import { UrlCreator } from '../url-creator';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  searchMovies(filter: MovieFilter): Observable<MovieSearchResponse> {
    let url = environment.movies;
    url = UrlCreator.of(url).createUrl();
    return this.http.post<MovieSearchResponse>(url, filter);
  }

  getMovie(id: number): Observable<Movie> {
    let url = environment.movie;
    url = UrlCreator.of(url).addPathVariable('id', id).createUrl();
    return this.http.get<Movie>(url);
  }

}
