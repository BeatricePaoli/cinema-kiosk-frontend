import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutocompleteTheaterFilter } from '../../models/theater';
import { UrlCreator } from '../url-creator';
import { TicketType } from '../../models/tickets';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  constructor(private http: HttpClient) { }

  getFilters(movieId?: number): Observable<AutocompleteTheaterFilter> {
    let url = environment.theaterFilter;
    if (movieId) {
      url = UrlCreator.of(url).addQueryParam("movieId", movieId).createUrl();
    } else {
      url = UrlCreator.of(url).createUrl();
    }
    return this.http.get<AutocompleteTheaterFilter>(url);
  }

  getTicketTypes(theaterId: number): Observable<TicketType[]> {
    let url = environment.ticketTypes;
    url = UrlCreator.of(url).addPathVariable('id', theaterId).createUrl();
    return this.http.get<TicketType[]>(url);
  }
}
