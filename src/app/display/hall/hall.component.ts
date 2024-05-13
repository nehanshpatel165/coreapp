import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../location/location.service';
import { DeviceService } from '../../device/device.service';


@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrl: './hall.component.scss'
})
export class HallComponent implements OnInit{
  min = 0;
  max = 3;
  value = 2;
  fanSwitchChecked = false;
   imagePath = 'assets/locationassets/';
   location_info_array: any[] = [];
   hallDevices: any[] = []; // Array to store bedroom data
   hallLocations: any[] = []; // Array to store bedroom data
   selectedHall: string=''; // Property to store the selected bedroom
   devicesByLocationArray:any[]=[]
   flattenedDevicesByLocationArray: any[] = [];
   devicesFound:boolean = true
    device_info_array: any;
  filteredHallDevices: any[] = [];
  
   constructor(private locationService: LocationService,private deviceService:DeviceService) {}
  
   ngOnInit(): void {
     this.fetchHallLocations();
      this.fetchHallDevices();
      this.filteredHallDevices = this.hallDevices.filter(device => device.location.location_name === this.selectedHall);
   }
  
  
  fetchHallDevices(): void {
    this.deviceService.getDeviceByCategory('Hallway').subscribe(data => {
      // Check if data is an array, if not, convert it to an array
      if (!Array.isArray(data)) {
          data = [data];
      }
      this.hallDevices = data[0].data; // Assign the fetched data to the bedrooms array
      console.log('bedroom devices',this.hallDevices)
   });
  }
  
  
  
  fetchHallLocations(): void {
    this.locationService.getLocation().subscribe(data => {
      console.log(data.data)
         const hallLocations = data.data.filter((item: { category: string; }) => item.category === 'Hallway');
         this.hallLocations = hallLocations.map((item: { location_name: any; img_name: string; level: any; id: any; category: any; }) => ({
           category: item.category,
           location_name: item.location_name,
         }
        ));
        //  console.log('bedroom locations', this.bedroomLocations);
         if (this.hallLocations.length > 0) {
          this.selectedHall = `${this.hallLocations[0].location_name}`;
        }
        });
   }
  
   onHallChange(event: any): void {
     this.selectedHall = event.target.value;
   this.updateFilteredDevices();
   }

   updateFilteredDevices(): void {
    this.filteredHallDevices = this.hallDevices.filter(device => device.location.location_name === this.selectedHall);
  }
  
   groupLampsInPairs(): any[][] {
    const lamps = this.hallDevices.filter(device => device.type_of_device === 'Lamp' && device.location.location_name === this.selectedHall);
    const groupedLamps = [];
    for (let i = 0; i < lamps.length; i += 2) {
       groupedLamps.push(lamps.slice(i, i + 2));
    }
    return groupedLamps;
   }


}
