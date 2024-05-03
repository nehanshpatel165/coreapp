import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../location/location.service';
import { DeviceService } from '../../device/device.service';

@Component({
 selector: 'app-bedroom',
 templateUrl: './bedroom.component.html',
 styleUrls: ['./bedroom.component.scss']
})
export class BedroomComponent implements OnInit {
  min = 0;
max = 3;
value = 2;
fanSwitchChecked = false;
 imagePath = 'assets/locationassets/';
 location_info_array: any[] = [];
 bedroomDevices: any[] = []; // Array to store bedroom data
 bedroomLocations: any[] = []; // Array to store bedroom data
 selectedBedroom: string=''; // Property to store the selected bedroom
 devicesByLocationArray:any[]=[]
 flattenedDevicesByLocationArray: any[] = [];
 devicesFound:boolean = true
  device_info_array: any;

 constructor(private locationService: LocationService,private deviceService:DeviceService) {}

 ngOnInit(): void {
   this.fetchBedroomLocations();
    this.fetchBedroomDevices();
    // this.fetchDevices();
 }


fetchBedroomDevices(): void {
  this.deviceService.getDeviceByCategory('Bed Room').subscribe(data => {
    // Check if data is an array, if not, convert it to an array
    if (!Array.isArray(data)) {
        data = [data];
    }
    this.bedroomDevices = data[0].data; // Assign the fetched data to the bedrooms array
    console.log('bedroom devices',this.bedroomDevices)
 });
}



fetchBedroomLocations(): void {
  this.locationService.getLocation().subscribe(data => {
    console.log(data.data)
       const bedroomLocations = data.data.filter((item: { category: string; }) => item.category === 'Bed Room');
       this.bedroomLocations = bedroomLocations.map((item: { location_name: any; img_name: string; level: any; id: any; category: any; }) => ({
         category: item.category,
         location_name: item.location_name,
       }
      ));
       console.log('bedroom locations', this.bedroomLocations);
       if (this.bedroomLocations.length > 0) {
        this.selectedBedroom = `${this.bedroomLocations[0].location_name}`;
      }
      });
 }

 onBedroomChange(event: any): void {
   this.selectedBedroom = event.target.value;
 }

 groupLampsInPairs(): any[][] {
  const lamps = this.bedroomDevices.filter(device => device.type_of_device === 'Lamp' && device.location.location_name === this.selectedBedroom);
  const groupedLamps = [];
  for (let i = 0; i < lamps.length; i += 2) {
     groupedLamps.push(lamps.slice(i, i + 2));
  }
  return groupedLamps;
 }




//////////////////////////////////////////


 
//  fetchDevices():void{
//   this.deviceService.getDevice().subscribe(data => {
//     console.log(data.data);
//     const devicesByLocation: { [location: string]: any[] } = {};

//     data.data.forEach((item: { device_name: string; type_of_device: string; data_source_id: string; id: number; location: string; desc: string }) => {
//       let device_info = {
//         device_name: item.device_name,
//         type_of_device: item.type_of_device,
//         data_source_id: item.data_source_id,
//         id: item.id,
//         location: item.location,
//         description: item.desc,
//       };

//       // Group devices by location
//       if (!devicesByLocation[item.location]) {
//         devicesByLocation[item.location] = [];
//       }
//       devicesByLocation[item.location].push(device_info);
//     });

//     // Now devicesByLocation contains all devices grouped by location
//    this.devicesByLocationArray = Object.values(devicesByLocation);
//    this.flattenedDevicesByLocationArray = this.devicesByLocationArray.flat();
//     console.log('flattened array:-',this.flattenedDevicesByLocationArray);
//     // You can now use devicesByLocation to access devices by their location
//  });
//  }

//  checkDevicesForSelectedBedroom(): void {
//   const devicesForSelectedBedroom = this.flattenedDevicesByLocationArray.filter(device => device.location === this.selectedBedroom);
//   this.devicesFound = devicesForSelectedBedroom.length > 0;
//  }



////////////////////////


}

