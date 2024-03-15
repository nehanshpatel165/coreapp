import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {path:'',component:DashboardComponent},
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent}, 
  {path:'dashboard',component:DashboardComponent,children:[{path:'home',component:HomeComponent}]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
