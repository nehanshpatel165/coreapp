import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries
} from "ng-apexcharts";
import { PieController } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from '../location/location.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  showgraph =false
  showElgraph =false
  selectedComponent = ' Hall'
  toggleGraph(){
    this.showgraph=!this.showgraph
  }

  

  toggleElGraph(){
    this.showElgraph=!this.showElgraph
  }
  
  //////////////////////////////////////////////////////////////
  location_info_array: any[] = []; 
 imagePath = 'assets/locationassets/'
  constructor(private locationService: LocationService,private router : Router,private route : ActivatedRoute) {}
 deleteLocation(id: string): void {
  if (id !== null) {
    this.locationService.deleteLocation(id).subscribe({
      next: (response) => {
        console.log('Location deleted successfully', response);
        this.location_info_array = this.location_info_array.filter(location => location.id !== id);
      },
      error: (error) => {
        console.error("Error while deleting the location", error);
      }
    });
  } else {
    console.error("Location ID is not provided");
  }
}
 ngOnInit(): void {
    this.locationService.getLocation().subscribe(data => {
      console.log(data.data);
      data.data.forEach((item: { location_name:string; img_name:string; level: string; id :number }) => {
        let location_info = {
          location_name: item.location_name,
          img_name: this.imagePath + item.img_name +'.svg',
          level: item.level,
          id:item.id,
        };
        this.location_info_array.push(location_info);
      });
    });
 }

}

