import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionesComponent } from './promociones.component';

describe('PromocionesComponent', () => {
  let component: PromocionesComponent;
  let fixture: ComponentFixture<PromocionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
