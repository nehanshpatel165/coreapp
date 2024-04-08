import { Component } from '@angular/core';
import { DeviceService } from '../../device/device.service';
import { LocationService } from '../../location/location.service';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.scss'
})
export class KitchenComponent {
  min = 0;
  max = 6;
  value = 4;
  fanSwitchChecked = false;
 imagePath = 'assets/locationassets/';
 location_info_array: any[] = [];
 kitchens: any[] = []; // Array to store bedroom data
 selectedKitchen: string=''; // Property to store the selected bedroom
 devicesByLocationArray:any[]=[]
 flattenedDevicesByLocationArray: any[] = [];
 devicesFound:boolean = true


 constructor(private locationService: LocationService,private deviceService:DeviceService) {}

 ngOnInit(): void {
    this.fetchKitchens();
    this.fetchDevices();
    this.checkDevicesForSelectedKitchen();
 }

fetchKitchens(): void {
 this.locationService.getLocation().subscribe(data => {
    this.kitchens = data.data.filter((location: { location_name: string; }) => location.location_name === 'Kitchen');
    if (this.kitchens.length > 0) {
      this.selectedKitchen = this.kitchens[0]; 
      // Select the first bedroom by default
    }
 });
 console.log('kitchens',this.kitchens)
}

 onKitchenChange(event: any): void {
   //  this.selectedBedroom = bedroom;
   this.selectedKitchen = event.target.value;
   this.checkDevicesForSelectedKitchen();
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
    console.log('devicesarr',this.flattenedDevicesByLocationArray);
    // You can now use devicesByLocation to access devices by their location
 });
 }

 checkDevicesForSelectedKitchen(): void {
  const devicesForSelectedKitchen = this.flattenedDevicesByLocationArray.filter(device => device.location === this.selectedKitchen);
  this.devicesFound = devicesForSelectedKitchen.length > 0;
 }

 groupLampsInPairs(): any[][] {
  // Assuming selectedBedroom is a property in your component that holds the currently selected bedroom
  const lamps = this.flattenedDevicesByLocationArray.filter(device => device.type_of_device === 'lamp' && device.location === this.selectedKitchen);
  const groupedLamps = [];
  for (let i = 0; i < lamps.length; i += 2) {
     groupedLamps.push(lamps.slice(i, i + 2));
  }
  return groupedLamps;
 }

}