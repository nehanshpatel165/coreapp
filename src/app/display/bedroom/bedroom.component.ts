import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../location/location.service';
import { DeviceService } from '../../device/device.service';

@Component({
 selector: 'app-bedroom',
 templateUrl: './bedroom.component.html',
 styleUrls: ['./bedroom.component.scss']
})
export class BedroomComponent implements OnInit {
 imagePath = 'assets/locationassets/';
 location_info_array: any[] = [];
 bedrooms: any[] = []; // Array to store bedroom data
 selectedBedroom: string=''; // Property to store the selected bedroom
 devicesByLocationArray:any[]=[]
 flattenedDevicesByLocationArray: any[] = [];

 constructor(private locationService: LocationService,private deviceService:DeviceService) {}

 ngOnInit(): void {
    this.fetchBedrooms();
    this.fetchDevices();
 }

fetchBedrooms(): void {
 this.locationService.getLocation().subscribe(data => {
    this.bedrooms = data.data.filter((location: { location_name: string; }) => location.location_name === 'Bedroom');
    if (this.bedrooms.length > 0) {
      this.selectedBedroom = this.bedrooms[0]; 
      // Select the first bedroom by default
    }
 });
 console.log(this.bedrooms)
}

 onBedroomChange(event: any): void {
   //  this.selectedBedroom = bedroom;
   this.selectedBedroom = event.target.value;
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

min = 0;
max = 6;
value = 4;
fanSwitchChecked = false;


}


