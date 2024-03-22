import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardModule } from '@coreui/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from '@coreui/angular';
import { GridModule } from '@coreui/angular';
import { WidgetModule } from '@coreui/angular';
import { NavbarModule } from '@coreui/angular';
import { SidebarModule } from '@coreui/angular';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WeathercompComponent } from './weathercomp/weathercomp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SolarComponent } from './solar/solar.component';
import { DropdownModule } from '@coreui/angular';
import { HttpClientModule } from '@angular/common/http';
import { AirqualityComponent } from './airquality/airquality.component';
import { LoginComponent } from './login/login.component';
import { LocationCreateComponent } from './location/location-create/location-create.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationViewComponent } from './location/location-view/location-view.component';
import { LocationEditComponent } from './location/location-edit/location-edit.component';
import { DeviceCreateComponent } from './device/device-create/device-create.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { DeviceEditComponent } from './device/device-edit/device-edit.component';
import { HallComponent } from './display/hall/hall.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { KitchenComponent } from './display/kitchen/kitchen.component';
import { BedroomComponent } from './display/bedroom/bedroom.component';
import { TooltipModule } from '@coreui/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeathercompComponent,
    DashboardComponent,
    SolarComponent,
    AirqualityComponent,
    LoginComponent,
    LocationCreateComponent,
    LocationViewComponent,
    LocationEditComponent,
    DeviceCreateComponent,
    DeviceListComponent,
    DeviceEditComponent,
    HallComponent,
    ElectricityComponent,
    KitchenComponent,
    BedroomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    BrowserAnimationsModule,
    ButtonModule,
    GridModule,
    WidgetModule,
    NavbarModule,
    SidebarModule,
    NgScrollbarModule,
    NgApexchartsModule,
    DropdownModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
