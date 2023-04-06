import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableReservaFilterComponent } from './table-reserva-filter.component';

describe('TableReservaFilterComponent', () => {
  let component: TableReservaFilterComponent;
  let fixture: ComponentFixture<TableReservaFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableReservaFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableReservaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
