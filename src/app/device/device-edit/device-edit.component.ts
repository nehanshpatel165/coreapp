import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../location/location.service';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrl: './device-edit.component.scss'
})
export class DeviceEditComponent {
  deviceInfo={
    device_name:'',
    type_of_device:'',
    data_source_id:'',
    id:'',
    desc:'',
    location:''
  }
 constructor(private route: ActivatedRoute, private locationService: LocationService, private router :Router,private deviceService:DeviceService) {}
 locations :any[] =[]
 isLoading = false

ngOnInit(): void {
  
  this.locationService.getLocation().subscribe(data =>{
    this.locations=data.data
    console.log(this.locations)
  })

  const id = this.route.snapshot.paramMap.get('id');
  if (id !== null) {
    this.deviceService.getDeviceById(id).subscribe({
      next: (device) => {
        this.deviceInfo = device.data;
      },
      error: (error) => {
        console.error("Error fetching device", error);
      }
    });
  } else {
    console.error("Device ID is not provided");
  }
}

onSubmit(form: NgForm): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id !== null) {
    this.deviceInfo.device_name=form.value.deviceName;
    this.deviceInfo.type_of_device=form.value.devicetype;
    this.deviceInfo.data_source_id=form.value.datasourceid;
    this.deviceInfo.id=id;
    this.deviceInfo.location=form.value.locationName
    this.deviceInfo.desc=form.value.deviceDescription
    this.deviceService.updateDevice(this.deviceInfo).subscribe({
      next:  (response) => {
        console.log('Device created successfully', response);
        this.toggleToast()
        this.toggleLoading()
        setTimeout(() => {
          this.router.navigate(['dashboard/device-list']); // Redirect after a delay
        }, 2000);
      },
      error: (error) => {
        console.error("Error while updating the device", error);
      }
    });
  } else {
    console.error("Device ID is not provided");
  }
;
}

position = 'top-end';

visible = false;
  percentage = 0;

  toggleToast() {
    this.visible = !this.visible;
  }

  toggleLoading(){
    this.isLoading=!this.isLoading
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }


}
