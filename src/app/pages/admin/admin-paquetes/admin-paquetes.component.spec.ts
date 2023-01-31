import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaquetesComponent } from './admin-paquetes.component';

describe('AdminPaquetesComponent', () => {
  let component: AdminPaquetesComponent;
  let fixture: ComponentFixture<AdminPaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaquetesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
