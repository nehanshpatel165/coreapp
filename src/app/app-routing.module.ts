import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LocationCreateComponent } from './location/location-create/location-create.component';
import { LocationViewComponent } from './location/location-view/location-view.component';
import { LocationEditComponent } from './location/location-edit/location-edit.component';
import { DeviceCreateComponent } from './device/device-create/device-create.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { DeviceEditComponent } from './device/device-edit/device-edit.component';
import { SignupComponent } from './signup/signup.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ActionComponent } from './action/action.component';

const routes: Routes = [
  // {path:'',component:DashboardComponent},
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent}, 
  {path:'dashboard',component:DashboardComponent, children:[
    {path:'home',component:HomeComponent},
    {path:'device-create',component:DeviceCreateComponent},
    {path:'device-list',component:DeviceListComponent},
    {path: 'device-list/devices/edit/:id', component: DeviceEditComponent },
    {path:'location-create',component:LocationCreateComponent},
    {path:'location-view',component:LocationViewComponent},
    {path: 'location-view/locations/edit/:id', component: LocationEditComponent },
    {path: 'user-profile',component:UserprofileComponent},
    {path: 'action',component:ActionComponent}
  ]},
  {path:'signup',component:SignupComponent},
  {path:'login/signup',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
