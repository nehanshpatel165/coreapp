import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../device/device.service';
import { LocationService } from '../../location/location.service';
@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrl: './hall.component.scss'
})
export class HallComponent {
  min = 0;
  max = 6;
  value = 4;
}
