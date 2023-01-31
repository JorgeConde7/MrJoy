import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCalendarioComponent } from './admin-calendario.component';

describe('AdminCalendarioComponent', () => {
  let component: AdminCalendarioComponent;
  let fixture: ComponentFixture<AdminCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCalendarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
