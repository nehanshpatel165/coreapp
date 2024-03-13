import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weathercomp',
  templateUrl: './weathercomp.component.html',
  styleUrl: './weathercomp.component.scss'
})
export class WeathercompComponent implements OnInit{

  constructor(private weatherservice:WeatherService){}

  weatherApp:any
  sum:string=''
  temp:number=0
  iconcode:string=''
  iconurl:string=''
  cityname:string=''
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log(longitude)
        console.log(latitude);
      ///////////////////////////////
      this.weatherservice.getUrl(latitude,longitude).subscribe({
        next:(app)=>{console.log(app)
        this.weatherApp=app;
        this.sum=this.weatherApp.weather[0].main
        this.temp=this.weatherApp.main.temp
        this.iconcode=this.weatherApp.weather[0].icon
        this.iconurl = "../assets/icons/" + this.iconcode + ".png";
        this.cityname=this.weatherApp.name
        },
      error:(err)=>console.log(err)
      });
    });
  }else{
    console.log('No Support For Geolocation')
  }
    ///////////////////////////////////////////////////////////
}
 
}
