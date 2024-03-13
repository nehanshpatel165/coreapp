import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:HttpClient) { }

  getUrl(lat:number,lon:number){
    // return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=surat&appid=383d65f39b625c3fd688a005a12005ec')
  return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=383d65f39b625c3fd688a005a12005ec&units=metric`)
  }




}
