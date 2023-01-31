import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioReservaComponent } from './calendario-reserva.component';

describe('CalendarioReservaComponent', () => {
  let component: CalendarioReservaComponent;
  let fixture: ComponentFixture<CalendarioReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
