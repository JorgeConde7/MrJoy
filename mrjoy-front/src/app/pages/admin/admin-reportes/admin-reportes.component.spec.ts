import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportesComponent } from './admin-reportes.component';

describe('AdminReportesComponent', () => {
  let component: AdminReportesComponent;
  let fixture: ComponentFixture<AdminReportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReportesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
