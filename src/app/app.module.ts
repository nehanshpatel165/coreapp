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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeathercompComponent,
    DashboardComponent,
    SolarComponent,
    AirqualityComponent,
    LoginComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
