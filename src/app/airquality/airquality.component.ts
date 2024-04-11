import { Component ,OnInit,OnDestroy,ElementRef, ViewChild, Renderer2} from '@angular/core';

@Component({
  selector: 'app-airquality',
  templateUrl: './airquality.component.html',
  styleUrl: './airquality.component.scss'
})
export class AirqualityComponent {
  @ViewChild('currentAqi', { static: true })
  currentAqi!: ElementRef; 
  @ViewChild('indicator', { static: true })
  indicator!: ElementRef; 

private intervalId: any;

 constructor(private renderer: Renderer2) {}

 ngOnInit() {
    this.startAqiSimulation();
 }

 ngOnDestroy() {
    clearInterval(this.intervalId);
 }

 calculateValue(aqi: number): number {
    return (aqi / 500) * 350 + 5;
 }

 startAqiSimulation() {
    let aqi = 0;
    this.intervalId = setInterval(() => {
      aqi++;
      const deg = this.calculateValue(aqi);
      // console.log(`AQI: ${aqi}, DEG: ${deg.toFixed(2)}`);
      this.renderer.setProperty(this.currentAqi.nativeElement, 'innerText', aqi.toString());
      this.renderer.setStyle(this.indicator.nativeElement, 'transform', `rotate(${deg}deg)`);
      if (aqi === 100) {
        clearInterval(this.intervalId);
      }
    }, 30);
 }

}
