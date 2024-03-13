import { Component } from '@angular/core';
import { INavData } from '@coreui/angular'; // Adjust the import path as necessary
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
navItems: INavData[] = [
  {
    name:'              '
  }
  ,
  {
    name: 'Home',
    url: '/home',
    icon: 'icon-new-item', // Adjust the icon as necessary
 },
 {
  name: 'Location',
  url: '/location',
  icon: 'icon-speedometer',
  // Assuming 'children' is a property used for dropdown items
  children: [
    {
      name: 'Create Location',
      url: '/location/create', // Adjust the URL as necessary
      icon: 'icon-plus', // Adjust the icon as necessary
    },
    {
      name: 'View Location',
      url: '/location/view', // Adjust the URL as necessary
      icon: 'icon-eye', // Adjust the icon as necessary
    },
  ],
},
  {
     name: 'Device',
     url: '/device',
     icon: 'icon-speedometer',
     // Assuming 'children' is a property used for dropdown items
     children: [
       {
         name: 'Create Device',
         url: '/device/create', // Adjust the URL as necessary
         icon: 'icon-plus', // Adjust the icon as necessary
       },
       {
         name: 'Device List',
         url: '/device/view', // Adjust the URL as necessary
         icon: 'icon-eye', // Adjust the icon as necessary
       },
     ],
  },
  // Add more navigation items as needed
 ];

}