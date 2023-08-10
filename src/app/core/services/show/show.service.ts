import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Show, ShowFilter } from '../../models/show';
import { UrlCreator } from '../url-creator';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private http: HttpClient) { }

  searchShows(filter: ShowFilter): Observable<Show[]> {
    let url = environment.shows;
    url = UrlCreator.of(url).createUrl();
    return this.http.post<Show[]>(url, filter);
  }
}
