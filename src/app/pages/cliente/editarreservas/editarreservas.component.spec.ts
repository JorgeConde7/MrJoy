import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarreservasComponent } from './editarreservas.component';

describe('EditarreservasComponent', () => {
  let component: EditarreservasComponent;
  let fixture: ComponentFixture<EditarreservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarreservasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarreservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
