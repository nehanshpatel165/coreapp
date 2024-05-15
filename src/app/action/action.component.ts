import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent {
  selectedAction: string='';
  temperature: number=0;
  responseType: string='';

  constructor(private http: HttpClient) {}

  onSubmit(form:NgForm): void {
    if (this.selectedAction === 'more' && this.temperature > 25 && this.responseType === 'sms') {
      this.http.post('http://127.0.0.1:8000/send-sms/',{})
       .subscribe(
        response => console.log(response),
        error => console.error(error)
       );
    }
  }


}
