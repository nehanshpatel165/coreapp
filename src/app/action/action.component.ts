import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeviceService } from '../device/device.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrl: './action.component.scss'
})
export class ActionComponent {
  selectedAction: string='';
  temperature: number=0;
  responseType: string='';
  temp:number=0;
  hum:number=0;
  constructor(private http: HttpClient, private deviceService :DeviceService) {}

  onSubmit(form:NgForm): void {
    this.dhtData();
    setTimeout(() => {
      if (this.selectedAction === 'more' && this.temp > this.temperature && this.responseType === 'sms') {
        this.http.post('http://127.0.0.1:8000/send-sms/', {})
         .subscribe(
            response => console.log(response),
            error => console.error(error)
          );
      }
    }, 0); 
  }

  dhtData(){
    this.deviceService.getDHTdata().subscribe(data =>{
      this.temp = data.data[0].Data.temp
      this.hum = data.data[0].Data.hum
      
      setTimeout(()=>{
        this.dhtData()
      },15000)
    })}

}
