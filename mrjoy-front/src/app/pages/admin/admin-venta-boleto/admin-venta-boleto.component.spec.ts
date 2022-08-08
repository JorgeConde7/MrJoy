import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVentaBoletoComponent } from './admin-venta-boleto.component';

describe('AdminVentaBoletoComponent', () => {
  let component: AdminVentaBoletoComponent;
  let fixture: ComponentFixture<AdminVentaBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVentaBoletoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVentaBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
