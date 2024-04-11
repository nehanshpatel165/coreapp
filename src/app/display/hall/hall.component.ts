import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../device/device.service';
import { LocationService } from '../../location/location.service';
@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrl: './hall.component.scss'
})
export class HallComponent implements OnInit{
  min = 0;
  max = 6;
  value = 4;
  fanSwitchChecked = false;
 imagePath = 'assets/locationassets/';
 location_info_array: any[] = [];
 halls: any[] = []; // Array to store bedroom data
 selectedHall: string=''; // Property to store the selected bedroom
 devicesByLocationArray:any[]=[]
 flattenedDevicesByLocationArray: any[] = [];
 devicesFound:boolean = true

 constructor(private locationService: LocationService,private deviceService:DeviceService) {}

 ngOnInit(): void {
    this.fetchHalls();
    this.fetchDevices();
    this.checkDevicesForSelectedHall();
 }

fetchHalls(): void {
 this.locationService.getLocation().subscribe(data => {
    this.halls = data.data.filter((location: { location_name: string; }) => location.location_name === 'Hall');
    if (this.halls.length > 0) {
      this.selectedHall = this.halls[0]; 
    }
 });
 console.log('halls',this.halls)
}

 onHallChange(event: any): void {
   //  this.selectedBedroom = bedroom;
   this.selectedHall = event.target.value;
   this.checkDevicesForSelectedHall();
    // Here you can add logic to update the UI based on the selected bedroom
 }

 
 fetchDevices():void{
  this.deviceService.getDevice().subscribe(data => {
    console.log(data.data);
    const devicesByLocation: { [location: string]: any[] } = {};

    data.data.forEach((item: { device_name: string; type_of_device: string; data_source_id: string; id: number; location: string; desc: string }) => {
      let device_info = {
        device_name: item.device_name,
        type_of_device: item.type_of_device,
        data_source_id: item.data_source_id,
        id: item.id,
        location: item.location,
        description: item.desc,
      };

      // Group devices by location
      if (!devicesByLocation[item.location]) {
        devicesByLocation[item.location] = [];
      }
      devicesByLocation[item.location].push(device_info);
    });

    // Now devicesByLocation contains all devices grouped by location
   this.devicesByLocationArray = Object.values(devicesByLocation);
   this.flattenedDevicesByLocationArray = this.devicesByLocationArray.flat();
    console.log(this.devicesByLocationArray);
    // You can now use devicesByLocation to access devices by their location
 });
 }

 checkDevicesForSelectedHall(): void {
  const devicesForSelectedHall = this.flattenedDevicesByLocationArray.filter(device => device.location === this.selectedHall);
  this.devicesFound = devicesForSelectedHall.length > 0;
 }

 groupLampsInPairs(): any[][] {
  const lamps = this.flattenedDevicesByLocationArray.filter(device => device.type_of_device === 'lamp' && device.location === this.selectedHall);
  const groupedLamps = [];
  for (let i = 0; i < lamps.length; i += 2) {
     groupedLamps.push(lamps.slice(i, i + 2));
  }
  return groupedLamps;
 }
}
