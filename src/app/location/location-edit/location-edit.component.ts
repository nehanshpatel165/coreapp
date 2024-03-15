import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrl: './location-edit.component.scss'
})
export class LocationEditComponent {

  locationInfo = {
    location_name: '',
    level: 0,
    img_name: '',
    id:''
 };

 constructor(private route: ActivatedRoute, private locationService: LocationService, private router :Router) {}
 images = [
  { value: 'master-bedroom', src: 'assets/locationassets/master-bedroom.svg' },
  { value: 'kitchen', src: 'assets/locationassets/kitchen.svg' },
  { value: 'bathtub', src: 'assets/locationassets/bathtub.svg' },
  { value: 'bathroom', src: 'assets/locationassets/bathroom.svg' },
];
selectedImage: string ='';
ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id !== null) {
    this.locationService.getLocationById(id).subscribe({
      next: (location) => {
        this.locationInfo = location;
      },
      error: (error) => {
        console.error("Error fetching location", error);
      }
    });
  } else {
    console.error("Location ID is not provided");
  }
}

onSubmit(form: NgForm): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id !== null) {
    this.locationInfo.location_name=form.value.locationName;
    this.locationInfo.level=form.value.level;
    this.locationInfo.img_name=form.value.imageGroup;
    this.locationInfo.id=id;
    this.locationService.updateLocation(this.locationInfo).subscribe({
      next: (response) => {
        console.log('Location updated successfully', response);
      },
      error: (error) => {
        console.error("Error while updating the location", error);
      }
    });
  } else {
    console.error("Location ID is not provided");
  }
  this.router.navigate(['dashboard/location-view']);
}

}
