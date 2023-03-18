import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtraccionesComponent } from './atracciones.component';

describe('ParquesComponent', () => {
  let component: AtraccionesComponent;
  let fixture: ComponentFixture<AtraccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtraccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtraccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
