import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrl: './hall.component.scss'
})
export class HallComponent {
  min = 0;
  max = 3;
  value = 1;
  fanSwitchChecked = false;
  logCheckboxValue(event: any) {
    console.log('Checkbox value:', event.target.checked);
 }
}
