import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private authService:AuthService,private router:Router){}
  errorMessage=''
  signupInfo={
    email:'',
    phone:'',
    password:'',
    password2:''
  }

  onSubmit(form:NgForm){
    this.signupInfo.email=form.value.email
    this.signupInfo.phone=form.value.phoneno
    this.signupInfo.password=form.value.password
    this.signupInfo.password2=form.value.password2
    console.log(this.signupInfo)
    this.authService.signup(this.signupInfo).subscribe(
      response => {
        this.toggleToast()
        console.log('Signup successfull', response);
        localStorage.setItem('accToken',response.Token.access)
        localStorage.setItem('refToken',response.Token.refresh)
      },
      error => { console.log("Error signup", error);
      const phoneError = error.error.error.phone ? error.error.error.phone[0] : '';
      const emailError = error.error.error.email ? error.error.error.email[0] : '';
      const nonFieldError = error.error.error.non_field_errors ? error.error.error.non_field_errors[0] : '';
      this.errorMessage = `${phoneError} ${emailError} ${nonFieldError}`.trim(); // Trim to remove leading/trailing spaces
      this.toggleErrorToast()
      }
    );
  }
  //////////////////////////////////////////////////////////
  position = 'top-end';
  visible = false;
  percentage = 0;

  toggleToast() {
    this.visible = !this.visible;
    // console.log('toggled toast')
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
