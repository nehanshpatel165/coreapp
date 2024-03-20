import { Component, OnInit } from '@angular/core';
import { ApexChart } from 'ng-apexcharts';


@Component({
  selector: 'app-solar',
  templateUrl: './solar.component.html',
  styleUrl: './solar.component.scss'
})
export class SolarComponent  {

  series=[{
    data: [20,22,18,30,26,24,27,28,29],
    name:'KWh'
  }]

  chartDetails:ApexChart={
    type:'line',
    toolbar:{
      show:true
    },
  }

  xaxis={
    categories:["01/05","02/05","03/05","04/05","05/05","06/05","07/05","08/05","09/05"]
  }

  yaxis= {
    title: {
      text: 'KWh'
    }
  }

  colors=['#ffc107']
}
