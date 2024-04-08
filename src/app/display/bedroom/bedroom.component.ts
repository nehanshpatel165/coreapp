import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
 devicesFound:boolean = true

 constructor(private locationService: LocationService,private deviceService:DeviceService) {}

 ngOnInit(): void {
    this.fetchBedrooms();
    this.fetchDevices();
    this.checkDevicesForSelectedBedroom();
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
   this.checkDevicesForSelectedBedroom();
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
    console.log('flattened array:-',this.flattenedDevicesByLocationArray);
    // You can now use devicesByLocation to access devices by their location
 });
 }

 checkDevicesForSelectedBedroom(): void {
  const devicesForSelectedBedroom = this.flattenedDevicesByLocationArray.filter(device => device.location === this.selectedBedroom);
  this.devicesFound = devicesForSelectedBedroom.length > 0;
 }

min = 0;
max = 6;
value = 4;
fanSwitchChecked = false;

////////////////////////
groupLampsInPairs(): any[][] {
 // Assuming selectedBedroom is a property in your component that holds the currently selected bedroom
 const lamps = this.flattenedDevicesByLocationArray.filter(device => device.type_of_device === 'lamp' && device.location === this.selectedBedroom);
 const groupedLamps = [];
 for (let i = 0; i < lamps.length; i += 2) {
    groupedLamps.push(lamps.slice(i, i + 2));
 }
 return groupedLamps;
}

}


