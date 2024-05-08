import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from '../../location/location.service';
import { DeviceService } from '../device.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrl: './device-create.component.scss'
})
export class DeviceCreateComponent {
  isLoading=false
  successMessage=''
  deviceInfo={
    device_name:'',
    type_of_device:'',
    // model:'',
    data_source_id:'',
    location_id:'',
    installation_date:'',
    filter_type:'' ,
    filter_change_interval:0,
    last_filter_change_date:''
  }
  locations :any[] =[]

  constructor(private locationService:LocationService,private deviceService:DeviceService,private router:Router,private datePipe:DatePipe){}
 

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
    this.deviceInfo.location_id=form.value.locationid
    this.deviceInfo.installation_date=form.value.installdate
    this.deviceInfo.filter_type=form.value.filtertype
    this.deviceInfo.filter_change_interval=+form.value.filterinterval
    this.deviceInfo.last_filter_change_date = form.value.lastfilterdate
    this.deviceService.createDevice(this.deviceInfo).subscribe(
      response => {
        console.log('Device created successfully', response);
        const responseMsg = response.message ? response.message : '';
        this.successMessage = `${responseMsg}`.trim();
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
