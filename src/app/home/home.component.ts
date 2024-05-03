import { Component, OnInit, SimpleChanges } from '@angular/core';
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
  selectedComponent = 'Hall'
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

//  ngOnInit(): void {
//     this.locationService.getLocation().subscribe(data => {
//       console.log(data.data);
//       data.data.forEach((item: { location_name:string; img_name:string; level: string; id :number }) => {
//         let location_info = {
//           location_name: item.location_name,
//           img_name: this.imagePath + item.img_name +'.svg',
//           level: item.level,
//           id:item.id,
//         };
//         this.location_info_array.push(location_info);
//       });
//     });
//     this.filteredLocations = this.filterUniqueLocations(this.location_info_array);
//     console.log('original array',this.location_info_array);
//     console.log('filtered array',this.filteredLocations);
    
//  }

ngOnInit(): void {
 this.locationService.getLocation().subscribe(data => {
    this.location_info_array = data.data.map((item: { location_name: any; img_name: string; level: any; id: any;category:'' }) => ({
      location_name: item.location_name,
      img_name: this.imagePath + item.img_name + '.svg',
      level: item.level,
      id: item.id,
      category: item.category,
      
    }));
    this.filteredLocations = this.filterUniqueLocations(this.location_info_array);
 });
}
 
 // Method to filter out duplicates based on location_name

filteredLocations: any[] = []; 

 filterUniqueLocations(array: any[]): any[] {
  const uniqueLocations = array.reduce((acc, current) => {
     const x = acc.find((item : any) => item.category === current.category);
     if (!x) {
       return acc.concat([current]);
     } else {
       return acc;
     }
  }, []);
  return uniqueLocations;
 }

 // Example of watching location_info_array for changes
//  ngOnChanges(changes: SimpleChanges) {
//   if (changes['location_info_array']) {
//      this.filteredLocations = this.filterUniqueLocations(this.location_info_array);
//   }
//  }
}

