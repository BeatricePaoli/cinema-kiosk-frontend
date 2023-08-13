import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../../models/booking';
import { environment } from 'src/environments/environment';
import { UrlCreator } from '../url-creator';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(dto: Booking): Observable<number> {
    let url = environment.bookings;
    url = UrlCreator.of(url).createUrl();
    return this.http.post<number>(url, dto);
  }

  getBooking(id: number): Observable<Booking> {
    let url = environment.booking;
    url = UrlCreator.of(url).addPathVariable('id', id).createUrl();
    return this.http.get<Booking>(url);
  }
}
