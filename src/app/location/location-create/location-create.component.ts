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

  locationInfo={
    location_name:'',
    level:'',
    img_name:''
  }


  onSubmit(form:NgForm){
    console.log(form);
    // this.locationInfo.location_name=form.value.locationName;
    this.locationInfo.location_name=form.value.location;
    this.locationInfo.level=form.value.level;
    this.locationInfo.img_name=form.value.imageGroup;
    this.locationService.createLocation(this.locationInfo).subscribe(
      response=>{
        console.log('Location created successfully',response);
      },error =>{
        console.error("Error while creating the location", error)
      }) 
    this.router.navigate(['dashboard/location-view'])
  }
  images = [
    { value: 'master-bedroom', src: 'assets/locationassets/master-bedroom.svg' },
    { value: 'kitchen', src: 'assets/locationassets/kitchen.svg' },
    { value: 'bathtub', src: 'assets/locationassets/bathtub.svg' },
    { value: 'bathroom', src: 'assets/locationassets/bathroom.svg' },
 ];
 selectedImage: string ='';
////////////////////////////////////////

}
