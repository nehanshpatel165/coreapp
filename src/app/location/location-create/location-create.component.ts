import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LocationService } from '../location.service';


@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrl: './location-create.component.scss'
})
export class LocationCreateComponent {
  constructor(private locationService:LocationService,private router:Router){}
  successMessage=''
  errorMessage=''
  locationInfo={
    category:'',
    level:0,
    img_name:'',
    location_name:''
  }


  onSubmit(form:NgForm){
    console.log(form);
    this.locationInfo.category=form.value.category;
    this.locationInfo.level=form.value.level;
    this.locationInfo.img_name=form.value.imageGroup;
    this.locationInfo.location_name=form.value.location_name
    this.locationService.createLocation(this.locationInfo).subscribe(
      response => {
        console.log('Location created successfully', response);
        const responseMsg = response.message ? response.message : '';
        this.successMessage = `${responseMsg}`.trim();
        this.toggleToast()
        this.toggleLoading()
        setTimeout(() => {
          this.router.navigate(['dashboard/location-view'])// Redirect after a delay
        }, 2000);
      },error =>{
        console.error("Error while creating the location", error);
        const errorMsg = error.message ? error.message : '';
        this.errorMessage = `${errorMsg}`.trim();
        this.toggleErrorToast()
      }) 
  }
  images = [
    { value: 'master-bedroom', src: 'assets/locationassets/master-bedroom.svg' },
    { value: 'kitchen', src: 'assets/locationassets/kitchen.svg' },
    { value: 'bathtub', src: 'assets/locationassets/bathtub.svg' },
    { value: 'bathroom', src: 'assets/locationassets/bathroom.svg' },
 ];
 selectedImage: string ='';
 //////////////////////////////////////////////////////////
 position = 'top-end';
 visible = false;
 percentage = 0;
 isLoading=false

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

  /////////////////////////////////////////////////////////////

errorPosition = 'top-end';
errorVisible = false;

toggleErrorToast() {
  this.errorVisible = !this.errorVisible;
  // console.log('toggled toast')
}

onVisibleChangeError($event: boolean) {
  this.errorVisible = $event;
}
}
