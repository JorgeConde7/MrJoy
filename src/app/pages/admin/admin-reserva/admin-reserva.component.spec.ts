import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservaComponent } from './admin-reserva.component';

describe('AdminReservaComponent', () => {
  let component: AdminReservaComponent;
  let fixture: ComponentFixture<AdminReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
