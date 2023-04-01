import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisConsultasComponent } from './mis-consultas.component';

describe('MisConsultasComponent', () => {
  let component: MisConsultasComponent;
  let fixture: ComponentFixture<MisConsultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisConsultasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisConsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
