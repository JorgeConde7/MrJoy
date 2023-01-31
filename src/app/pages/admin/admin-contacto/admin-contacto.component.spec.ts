import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactoComponent } from './admin-contacto.component';

describe('AdminContactoComponent', () => {
  let component: AdminContactoComponent;
  let fixture: ComponentFixture<AdminContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
