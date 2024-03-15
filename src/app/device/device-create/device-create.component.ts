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
  deviceInfo={
    device_name:'',
    type_of_device:'',
    // model:'',
    data_source_id:''
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
    this.deviceService.createDevice(this.deviceInfo).subscribe(
      response => {console.log('Device created successfully',response)},
      error =>{console.log("Error while creating the device",error)}
    )
    this.router.navigate(['dashboard/device-list'])
  }
}
