import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular'; // Adjust the import path as necessary
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient, private authService:AuthService) { }
 
  
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
         icon: 'fa-solid fa-plus', // Adjust the icon as necessary
       },
       {
         name: 'Device List',
         url: 'device-list', // Adjust the URL as necessary
         icon: 'fa-solid fa-list', // Adjust the icon as necessary
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
        icon: 'fa-solid fa-plus', // Adjust the icon as necessary
      },
      {
        name: 'View Location',
        url: 'location-view', // Adjust the URL as necessary
        icon: 'fa-solid fa-list', // Adjust the icon as necessary
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

 currentEmail=''
 currentName=''
 ngOnInit(): void {
  this.authService.getProfile().subscribe(data => {
    this.currentEmail=data.email
    this.currentName=data.name.substring(0,1).toUpperCase()
 })
 }
}
