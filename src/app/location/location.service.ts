import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class LocationService {
 private apiUrl = 'http://127.0.0.1:8000/location/';

 constructor(private http: HttpClient) { }

 createLocation(locationInfo: any): Observable<any> {
    return this.http.post(this.apiUrl, locationInfo);
 }

 getLocation(): Observable<any> {
   return this.http.get(this.apiUrl);
 }

 getLocationById(id: string): Observable<any> {
  return this.http.get(`http://127.0.0.1:8000/location/${id}/`);
}

 updateLocation(locationInfo: any): Observable<any> {
  return this.http.put(`http://127.0.0.1:8000/location/${locationInfo.id}/`, locationInfo);
}

 deleteLocation(id: string): Observable<any> {
  return this.http.delete(`http://127.0.0.1:8000/location/${id}`); 
}
}