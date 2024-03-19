import { Component } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-electricity',
  templateUrl: './electricity.component.html',
  styleUrl: './electricity.component.scss'
})
export class ElectricityComponent {
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
