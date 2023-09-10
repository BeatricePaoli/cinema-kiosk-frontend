import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device, DeviceActivity, DeviceActivityEvent, DeviceFilterDto } from '../../models/device';
import { UrlCreator } from '../url-creator';
import { BookingStatus } from '../../models/booking';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getDeviceList(dto: DeviceFilterDto): Observable<Device[]> {
    let url = environment.devices;
    url = UrlCreator.of(url).createUrl();
    return this.http.post<Device[]>(url, dto);
  }

  getDevice(id: number): Observable<Device> {
    let url = environment.device;
    url = UrlCreator.of(url).addPathVariable('id', id).createUrl();
    return this.http.get<Device>(url);
  }

  getDeviceActivities(id: number): Observable<DeviceActivity[]> {
    // let url = environment.deviceActivities;
    // url = UrlCreator.of(url).addPathVariable('id', id).createUrl();
    // return this.http.get<DeviceActivity[]>(url);
    return of([
      {
        id: 1,
        tms: new Date(),
        emitterSerial: "ABCD12",
        eventCode: DeviceActivityEvent.ACTIVATION,
        quantity: 1,
        product: {
          id: 1,
          name: "Coca Cola",
          price: 9,
          currency: "EUR",
          productCode: "ABCD",
        },
        booking: {
          id: 1,
          city: "Firenze",
          theater: {
            id: 1,
            name: "Cinema Test",
            address: {
              id: 1,
              city: "",
              country: "",
              number: "",
              zipCode: "",
              street: "",
            }
          },
          movie: {
            id: 1,
            name: "Spiderman",
            img: "",
            releaseDate: new Date(),
            durationMins: 100,
            score: 5,
            genres: [],
            description: "",
            actors: [],
          },
          seats: [],
          showId: 1,
          date: new Date(),
          startTime: "14:00",
          price: 10,
          codeUrl: "",
          status: BookingStatus.CREATED,
          username: "beatrice",
        }
      }
    ])
  }

  deactivateSmartBand(id: number): Observable<void> {
    // let url = environment.device;
    // url = UrlCreator.of(url).addPathVariable('id', id).createUrl();
    // return this.http.patch<void>(url, {});
    return of(void 0);
  }
}
