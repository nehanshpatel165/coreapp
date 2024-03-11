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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WeathercompComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
