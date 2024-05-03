import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService:AuthService,private router:Router){}

  loginInfo={
    phone:'',
    password:'',
  }

  onSubmit(form:NgForm){
    this.loginInfo.phone=form.value.phoneno
    this.loginInfo.password=form.value.password
    console.log(this.loginInfo)
    this.authService.login(this.loginInfo).subscribe(
      response => {
        console.log('login successfull', response);
        this.router.navigateByUrl('/dashboard/home')
      },
      error => { console.log("Error login", error);}
    );
  }
}
