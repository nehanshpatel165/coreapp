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
 devicesFound:boolean = false
  device_info_array: any;
  filteredBedroomDevices: any[] = [];

 constructor(private locationService: LocationService,private deviceService:DeviceService) {}

 ngOnInit(): void {
   this.fetchBedroomLocations();
   this.fetchBedroomDevices();
   // this.fetchDevices();
    this.filteredBedroomDevices = this.bedroomDevices.filter(device => device.location.location_name === this.selectedBedroom);
      
 }


fetchBedroomDevices(): void {
  this.deviceService.getDeviceByCategory('Bed Room').subscribe(data => {
    // Check if data is an array, if not, convert it to an array
    if (!Array.isArray(data)) {
        data = [data];
    }
    this.bedroomDevices = data[0].data; // Assign the fetched data to the bedrooms array
    // console.log('bedroom devices',this.bedroomDevices)
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
      //  console.log('bedroom locations', this.bedroomLocations);
       if (this.bedroomLocations.length > 0) {
        this.selectedBedroom = `${this.bedroomLocations[0].location_name}`;
      }
      });
 }

 onBedroomChange(event: any): void {
   this.selectedBedroom = event.target.value;
   this.updateFilteredDevices();
 }

 updateFilteredDevices(): void {
  this.filteredBedroomDevices = this.bedroomDevices.filter(device => device.location.location_name === this.selectedBedroom);
}

 groupLampsInPairs(): any[][] {
  const lamps = this.bedroomDevices.filter(device => device.type_of_device === 'Lamp' && device.location.location_name === this.selectedBedroom);
  const groupedLamps = [];
  for (let i = 0; i < lamps.length; i += 2) {
     groupedLamps.push(lamps.slice(i, i + 2));
  }
  return groupedLamps;
 }
}

