import { Component } from '@angular/core';
import { INavData } from '@coreui/angular'; // Adjust the import path as necessary
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  sidebarStatus=true
  toggleSidebar(){
    this.sidebarStatus=!this.sidebarStatus
  }
  
navItems: INavData[] = [
  {
    name: 'Home',
    url: 'home',
    icon: 'cilList', // Adjust the icon as necessary
 },
  {
     name: 'Device',
     url: '/device',
     icon: '',
     // Assuming 'children' is a property used for dropdown items
     children: [
       {
         name: 'Create Device',
         url: 'device-create', // Adjust the URL as necessary
         icon: 'icon-plus', // Adjust the icon as necessary
       },
       {
         name: 'Device List',
         url: 'device-list', // Adjust the URL as necessary
         icon: 'icon-eye', // Adjust the icon as necessary
       },
     ],
  },
  {
    name: 'Location',
    url: '/location',
    icon: 'icon-speedometer',
    // Assuming 'children' is a property used for dropdown items
    children: [
      {
        name: 'Create Location',
        url: 'location-create', // Adjust the URL as necessary
        icon: 'icon-plus', // Adjust the icon as necessary
      },
      {
        name: 'View Location',
        url: 'location-view', // Adjust the URL as necessary
        icon: 'icon-eye', // Adjust the icon as necessary
      },
    ],
  },
  {
    name:'Logout',
    url:'/login'
  }
  // Add more navigation items as needed
 ];

}
