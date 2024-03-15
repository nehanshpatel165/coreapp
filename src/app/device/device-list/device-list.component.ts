import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent {
  device_info_array: any[] = []; 
  constructor(private deviceService: DeviceService,private router : Router,private route : ActivatedRoute) {}

  deleteDevice(id: string): void {
    if (id !== null) {
      this.deviceService.deleteDevice(id).subscribe({
        next: (response) => {
          console.log('Device deleted successfully', response);
          this.device_info_array = this.device_info_array.filter(location => location.id !== id);
        },
        error: (error) => {
          console.error("Error while deleting the device", error);
        }
      });
    } else {
      console.error("Device ID is not provided");
    }
  }

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
