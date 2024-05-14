import { Component } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent {

  // constructor(private http: HttpClient, private authService:AuthService,private router :Router) { }
  // userInfo={
  //   name:'',
  //   email:'',
  //   phone:0,
  // }

  // ngOnInit(): void {
  //  this.authService.getProfile().subscribe(data => {
  //    this.userInfo.email=data.email
  //    this.userInfo.name=data.name
  //    this.userInfo.phone=data.phone
  // })
  // }

  // onSubmit(form: NgForm): void {
  //     this.userInfo.email=form.value.email;
  //     this.userInfo.phone=form.value.phone;
  //     this.userInfo.name=form.value.name;
  //     this.authService.updateProfile(this.userInfo).subscribe({
  //       next:  (response) => {
  //         console.log('User Profile successfully updated', response);
  //         const responseMsg = response.message ? response.message : '';
  //         // this.successMessage = `${responseMsg}`.trim();
  //         this.toggleToast()
  //         this.toggleLoading()
  //         setTimeout(() => {
  //           this.isLoading=false
  //         }, 2000);
  //       },
  //       error: (error) => {
  //         console.error("Error while updating the device", error);
  //       }
  //     });
  // }

}
