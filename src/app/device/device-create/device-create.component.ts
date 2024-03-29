import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from '../../location/location.service';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrl: './device-create.component.scss'
})
export class DeviceCreateComponent {
  isLoading=false
  deviceInfo={
    device_name:'',
    type_of_device:'',
    // model:'',
    data_source_id:'',
    location:''
  }
  locations :any[] =[]

  constructor(private locationService:LocationService,private deviceService:DeviceService,private router:Router){}
 

  ngOnInit(): void {
    this.locationService.getLocation().subscribe(data =>{
      this.locations=data.data
      console.log(this.locations)
    })
  }
  onSubmit(form:NgForm){
    
    console.log(form)
    this.deviceInfo.device_name=form.value.deviceName
    this.deviceInfo.data_source_id=form.value.datasourceid
    this.deviceInfo.type_of_device=form.value.devicetype
    // this.deviceInfo.location=form.value.locationName
    this.deviceService.createDevice(this.deviceInfo).subscribe(
      response => {
        console.log('Device created successfully', response);
        this.toggleToast()
        this.toggleLoading()
        setTimeout(() => {
          this.router.navigate(['dashboard/device-list']); // Redirect after a delay
        }, 2000);
      },
      error => { console.log("Error while creating the device", error);}
    );
   
  }

//////////////////////////////////////////////////////////
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
