import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device } from '../../models/device';
import { UrlCreator } from '../url-creator';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getDeviceList(theaterId: number, type: string): Observable<Device[]> {
    // let url = environment.devices;
    // url = UrlCreator.of(url).addPathVariable('id', theaterId).addQueryParam('type', type).createUrl();
    // return this.http.get<Device[]>(url);
    if (type === 'smartband') {
      return of([
        {
          id: 1,
          contextBrokerId: "urn:ngsi:SmartBand:smartBand1",
          isActive: true,
        },
        {
          id: 2,
          contextBrokerId: "urn:ngsi:SmartBand:smartBand2",
          isActive: true,
        },
        {
          id: 3,
          contextBrokerId: "urn:ngsi:SmartBand:smartBand3",
          isActive: true,
        },
        {
          id: 4,
          contextBrokerId: "urn:ngsi:SmartBand:smartBand4",
          isActive: true,
        },
        {
          id: 5,
          contextBrokerId: "urn:ngsi:SmartBand:smartBand5",
          isActive: true,
        },
        {
          id: 6,
          contextBrokerId: "urn:ngsi:SmartBand:smartBand6",
          isActive: false,
        }
      ])
    } else {
      return of([
        {
          id: 1,
          contextBrokerId: "urn:ngsi:CashRegister:cashRegister1",
          isActive: true,
        },
        {
          id: 2,
          contextBrokerId: "urn:ngsi:CashRegister:cashRegister2",
          isActive: true,
        },
      ])
    }
  }

  deactivateSmartBand(theaterId: number, id: number): Observable<void> {
    // let url = environment.devices;
    // url = UrlCreator.of(url).addPathVariable('id', theaterId).addPathVariable('deviceId', id).createUrl();
    // return this.http.patch<void>(url, {});
    return of(void 0);
  }
}
