import { Component } from '@angular/core';
import { INavData } from '@coreui/angular'; // Adjust the import path as necessary
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  sidebarStatus=false
  toggleSidebar(){
    this.sidebarStatus=!this.sidebarStatus
  }
  
navItems: INavData[] = [
  {
    name: 'Home',
    url: 'home',
    icon: 'fa-solid fa-house', // Adjust the icon as necessary
 },
  {
     name: 'Device',
     url: '/device',
     icon: 'fa-solid fa-mobile',
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
    icon: 'fa-solid fa-location-crosshairs',
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
    url:'/login',
    icon:'fa-solid fa-right-from-bracket'
  }
  // Add more navigation items as needed
 ];

}
