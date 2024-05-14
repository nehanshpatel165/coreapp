import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../location/location.service';
import { DeviceService } from '../../device/device.service';


@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrl: './kitchen.component.scss'
})
export class KitchenComponent implements OnInit{
  min = 0;
  max = 3;
  value = 2;
  fanSwitchChecked = false;
   imagePath = 'assets/locationassets/';
   location_info_array: any[] = [];
   kitchenDevices: any[] = []; // Array to store bedroom data
   kitchenLocations: any[] = []; // Array to store bedroom data
   selectedKitchen: string=''; // Property to store the selected bedroom
   devicesByLocationArray:any[]=[]
   flattenedDevicesByLocationArray: any[] = [];
   devicesFound:boolean = false
    device_info_array: any;
    filteredKitchenDevices: any[] = [];
  
   constructor(private locationService: LocationService,private deviceService:DeviceService) {}
  
   ngOnInit(): void {
     this.fetchKitchenLocations();
     this.filteredKitchenDevices = this.kitchenDevices.filter(device => device.location.location_name === this.selectedKitchen);
     this.fetchKitchenDevices();
      // this.fetchDevices();
   }
  
  
  fetchKitchenDevices(): void {
    this.deviceService.getDeviceByCategory('Kitchen').subscribe(data => {
      // Check if data is an array, if not, convert it to an array
      if (!Array.isArray(data)) {
          data = [data];
      }
      this.kitchenDevices = data[0].data; // Assign the fetched data to the bedrooms array
      // console.log('bedroom devices',this.bedroomDevices)
   });
  }
  
  
  
  fetchKitchenLocations(): void {
    this.locationService.getLocation().subscribe(data => {
      console.log(data.data)
         const bedroomLocations = data.data.filter((item: { category: string; }) => item.category === 'Kitchen');
         this.kitchenLocations = bedroomLocations.map((item: { location_name: any; img_name: string; level: any; id: any; category: any; }) => ({
           category: item.category,
           location_name: item.location_name,
         }
        ));
        //  console.log('bedroom locations', this.bedroomLocations);
         if (this.kitchenLocations.length > 0) {
          this.selectedKitchen = `${this.kitchenLocations[0].location_name}`;
        }
        });
   }
  
   onKitchenChange(event: any): void {
     this.selectedKitchen = event.target.value;
     this.updateFilteredDevices();
   }
  
   updateFilteredDevices(): void {
    this.filteredKitchenDevices = this.kitchenDevices.filter(device => device.location.location_name === this.selectedKitchen);
  }
  
   groupLampsInPairs(): any[][] {
    const lamps = this.kitchenDevices.filter(device => device.type_of_device === 'Lamp' && device.location.location_name === this.selectedKitchen);
    const groupedLamps = [];
    for (let i = 0; i < lamps.length; i += 2) {
       groupedLamps.push(lamps.slice(i, i + 2));
    }
    return groupedLamps;
   }
}
