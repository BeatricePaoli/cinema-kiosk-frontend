import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device, DeviceActivity, DeviceFilterDto } from '../../models/device';
import { UrlCreator } from '../url-creator';

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
    let url = environment.deviceActivities;
    url = UrlCreator.of(url).addPathVariable('id', id).createUrl();
    return this.http.get<DeviceActivity[]>(url);
  }

  deactivateSmartBand(id: number): Observable<void> {
    let url = environment.device;
    url = UrlCreator.of(url).addPathVariable('id', id).createUrl();
    return this.http.patch<void>(url, {});
  }
}
