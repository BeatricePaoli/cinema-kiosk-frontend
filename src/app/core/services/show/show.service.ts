import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UrlCreator } from '../url-creator';
import { Show } from '../../models/show';
import { MovieFilter } from '../../models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private http: HttpClient) { }

  searchShows(filter: MovieFilter): Observable<Show[]> {
    let url = environment.shows;
    url = UrlCreator.of(url).createUrl();
    return this.http.post<Show[]>(url, filter);
  }
}
