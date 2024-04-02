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
          this.device_info_array = this.device_info_array.filter(device => device.id !== id);
          this.toggleDeleteConfirmationModal();
          this.toggleToast()
        },
        error: (error) => {
          console.error("Error while deleting the device", error);
          this.toggleDeleteConfirmationModal();
        }
      });
    } else {
      console.error("Device ID is not provided");
    }
    this.router.navigate(['dashboard/device-list']);
  }

  ngOnInit(): void {
    this.deviceService.getDevice().subscribe(data => {
      console.log(data.data);
      data.data.forEach((item: { device_name:string; type_of_device:string; data_source_id: string; id :number ;location:string,desc:string}) => {
        let device_info = {
          device_name: item.device_name,
          type_of_device:item.type_of_device,
          data_source_id:item.data_source_id,
          id:item.id,
          location:item.location,
          description:item.desc,
        };
        this.device_info_array.push(device_info);
      });
    });
 }

 public visible = false;

 toggleLiveDemo() {
   this.visible = !this.visible;
 }

 handleLiveDemoChange(event: any) {
   this.visible = event;
 }

 deviceToDeleteId: string | null = null;
 showDeleteConfirmationModal = false;

prepareDeleteDevice(id: string): void {
 this.deviceToDeleteId = id; 
 this.showDeleteConfirmationModal = true; 
}

toggleDeleteConfirmationModal(): void {
 this.showDeleteConfirmationModal = !this.showDeleteConfirmationModal;
}

handleDeleteConfirmationChange(event: any): void {
 this.showDeleteConfirmationModal = event;
}


//////////////////////////////////////////////////////////
position = 'top-end';
percentage = 0;

toggleToast() {
  this.visible = !this.visible;
}



// onVisibleChange($event: boolean) {
//   this.visible = $event;
//   this.percentage = !this.visible ? 0 : this.percentage;
// }

// onTimerChange($event: number) {
//   this.percentage = $event * 25;
// }
}

