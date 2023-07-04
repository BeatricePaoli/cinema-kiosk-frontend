import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieFilter, MovieSearchResponse } from '../../models/movie';
import { UrlCreator } from '../url-creator';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  searchMovies(filter: MovieFilter): Observable<MovieSearchResponse> {
    let url = environment.movies;
    url = UrlCreator.of(url).createUrl();
    return this.http.post<MovieSearchResponse>(url, filter).pipe(delay(1000));
  }

}
