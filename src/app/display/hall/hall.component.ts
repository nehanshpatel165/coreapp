import { Component } from '@angular/core';

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
