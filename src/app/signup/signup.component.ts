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
        console.log('Signup successfull', response);
        localStorage.setItem('accToken',response.Token.access)
        localStorage.setItem('refToken',response.Token.refresh)
      },
      error => { console.log("Error signup", error);}
    );
  }
}
