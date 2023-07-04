import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TheaterFilter } from '../../models/theater';
import { UrlCreator } from '../url-creator';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {

  constructor(private http: HttpClient) { }

  getFilters(): Observable<TheaterFilter> {
    let url = environment.theaterFilter;
    url = UrlCreator.of(url).createUrl();
    return this.http.get<TheaterFilter>(url);
  }
}
