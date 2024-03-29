import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../device/device.service';
import { LocationService } from '../../location/location.service';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrl: './hall.component.scss'
})
export class HallComponent {
  min = 0;
  max = 3;
  value = 1;
  fanSwitchChecked = false;
  logCheckboxValue(event: any) {
    console.log('Checkbox value:', event.target.checked);
 }
 constructor(private route: ActivatedRoute, private locationService: LocationService, private router :Router,private deviceService:DeviceService) {}
 device_info_array: any[] = []; 
  ngOnInit(): void {
    this.deviceService.getDevice().subscribe(data => {
      console.log(data.data);
      data.data.forEach((item: { device_name:string; type_of_device:string; data_source_id: string; id :number }) => {
        let device_info = {
          device_name: item.device_name,
          type_of_device:item.type_of_device,
          data_source_id:item.data_source_id,
          id:item.id,
        };
        this.device_info_array.push(device_info);
      });
    });
 }
}
