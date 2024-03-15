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

  toggleGraph(){
    this.showgraph=!this.showgraph
  }


  series=[{
    data: [23, 34, 12, 54, 32,]
  }]

  chartDetails:ApexChart={
    type:'line',
    toolbar:{
      show:true
    },
  }

  xaxis={
    categories:["Jan","Feb","Mar","Apr","May"]
  }

  
}

