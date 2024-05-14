import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {

  constructor(private http: HttpClient, private authService:AuthService,private router :Router) { }
  userInfo={
    name:'',
    email:'',
    phone:0,
  }

  ngOnInit(): void {
   this.authService.getProfile().subscribe(data => {
     this.userInfo.email=data.email
     this.userInfo.name=data.name
     this.userInfo.phone=data.phone
  })
  }

  onSubmit(form: NgForm): void {
      this.userInfo.email=form.value.email;
      this.userInfo.phone=form.value.phone;
      this.userInfo.name=form.value.name;
      this.authService.updateProfile(this.userInfo).subscribe({
        next:  (response) => {
          console.log('User Profile successfully updated', response);
          const responseMsg = response.message ? response.message : '';
          // this.successMessage = `${responseMsg}`.trim();
          this.toggleToast()
          this.toggleLoading()
          setTimeout(() => {
            this.isLoading=false
          }, 2000);
        },
        error: (error) => {
          console.error("Error while updating the device", error);
        }
      });
  }
  
  position = 'top-end';
  
  visible = false;
    percentage = 0;
  
    toggleToast() {
      this.visible = !this.visible;
    }
 isLoading = false
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
