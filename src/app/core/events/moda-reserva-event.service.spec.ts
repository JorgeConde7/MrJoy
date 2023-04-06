import { TestBed } from '@angular/core/testing';

import { ModaReservaEventService } from './moda-reserva-event.service';

describe('ModaReservaEventService', () => {
  let service: ModaReservaEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModaReservaEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
