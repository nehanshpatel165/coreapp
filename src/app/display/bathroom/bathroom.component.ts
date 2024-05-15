import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../location/location.service';
import { DeviceService } from '../../device/device.service';
@Component({
  selector: 'app-bathroom',
  templateUrl: './bathroom.component.html',
  styleUrl: './bathroom.component.scss'
})
export class BathroomComponent implements OnInit {
  min = 0;
  max = 3;
  value = 2;
  fanSwitchChecked = false;
   imagePath = 'assets/locationassets/';
   location_info_array: any[] = [];
   bathroomDevices: any[] = []; // Array to store bedroom data
   bathroomLocations: any[] = []; // Array to store bedroom data
   selectedBathroom: string=''; // Property to store the selected bedroom
   devicesByLocationArray:any[]=[]
   flattenedDevicesByLocationArray: any[] = [];
   devicesFound:boolean = false
    device_info_array: any;
    filteredBathroomDevices: any[] = [];
  
   constructor(private locationService: LocationService,private deviceService:DeviceService) {}
  
   ngOnInit(): void {
     this.fetchBathroomLocations();
     this.fetchBathroomDevices();
     // this.fetchDevices();
      this.filteredBathroomDevices = this.bathroomDevices.filter(device => device.location.location_name === this.selectedBathroom);
        
   }
  
  
  fetchBathroomDevices(): void {
    this.deviceService.getDeviceByCategory('Bathroom').subscribe(data => {
      // Check if data is an array, if not, convert it to an array
      if (!Array.isArray(data)) {
          data = [data];
      }
      this.bathroomDevices = data[0].data; // Assign the fetched data to the bedrooms array
      // console.log('bedroom devices',this.bedroomDevices)
      this.updateFilteredDevices()
   });
  }
  
  
  
  fetchBathroomLocations(): void {
    this.locationService.getLocation().subscribe(data => {
      // console.log(data.data)
         const bathroomLocations = data.data.filter((item: { category: string; }) => item.category === 'Bathroom');
         this.bathroomLocations = bathroomLocations.map((item: { location_name: any; img_name: string; level: any; id: any; category: any; }) => ({
           category: item.category,
           location_name: item.location_name,
         }
        ));
        //  console.log('bedroom locations', this.bedroomLocations);
         if (this.bathroomLocations.length > 0) {
          this.selectedBathroom = `${this.bathroomLocations[0].location_name}`;
        }
        });
   }
  
   onBathroomChange(event: any): void {
     this.selectedBathroom = event.target.value;
     this.updateFilteredDevices();
   }
  
   updateFilteredDevices(): void {
    this.filteredBathroomDevices = this.bathroomDevices.filter(device => device.location.location_name === this.selectedBathroom);
  }
  
   groupLampsInPairs(): any[][] {
    const lamps = this.bathroomDevices.filter(device => device.type_of_device === 'Lamp' && device.location.location_name === this.selectedBathroom);
    const groupedLamps = [];
    for (let i = 0; i < lamps.length; i += 2) {
       groupedLamps.push(lamps.slice(i, i + 2));
    }
    return groupedLamps;
   }
}
