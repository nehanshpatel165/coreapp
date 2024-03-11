import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathercompComponent } from './weathercomp.component';

describe('WeathercompComponent', () => {
  let component: WeathercompComponent;
  let fixture: ComponentFixture<WeathercompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeathercompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeathercompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
