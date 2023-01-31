import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioseguridadComponent } from './bioseguridad.component';

describe('BioseguridadComponent', () => {
  let component: BioseguridadComponent;
  let fixture: ComponentFixture<BioseguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BioseguridadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BioseguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
