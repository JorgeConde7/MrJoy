import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmpleadoComponent } from './admin-empleado.component';

describe('AdminEmpleadoComponent', () => {
  let component: AdminEmpleadoComponent;
  let fixture: ComponentFixture<AdminEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
