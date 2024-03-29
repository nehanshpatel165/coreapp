import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrl: './location-view.component.scss'
})
export class LocationViewComponent {
  location_info_array: any[] = []; 
 imagePath = 'assets/locationassets/'
 constructor(private locationService: LocationService,private router : Router,private route : ActivatedRoute) {}
 deleteLocation(id: string): void {
  if (id !== null) {
    this.locationService.deleteLocation(id).subscribe({
      next: (response) => {
        console.log('Location deleted successfully', response);
        this.location_info_array = this.location_info_array.filter(location => location.id !== id);
        this.toggleDeleteConfirmationModal();
      },
      error: (error) => {
        console.error("Error while deleting the location", error);
        this.toggleDeleteConfirmationModal();
      }
    });
  } else {
    console.error("Location ID is not provided");
  }
  this.router.navigate(['dashboard/location-view']);
}
 ngOnInit(): void {
    this.locationService.getLocation().subscribe(data => {
      console.log(data.data);
      data.data.forEach((item: { location_name:string; img_name:string; level: string; id :number }) => {
        let location_info = {
          location_name: item.location_name,
          img_name: this.imagePath + item.img_name +'.svg',
          level: item.level,
          id:item.id,
        };
        this.location_info_array.push(location_info);
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

 locationToDeleteId: string | null = null;
 showDeleteConfirmationModal = false;

prepareDeleteLocation(id: string): void {
 this.locationToDeleteId = id; 
 this.showDeleteConfirmationModal = true; 
}

toggleDeleteConfirmationModal(): void {
 this.showDeleteConfirmationModal = !this.showDeleteConfirmationModal;
}

handleDeleteConfirmationChange(event: any): void {
 this.showDeleteConfirmationModal = event;
}
}
