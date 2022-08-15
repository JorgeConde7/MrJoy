import { TestBed } from '@angular/core/testing';

import { AdminPromocionesService } from './admin-promociones.service';

describe('AdminPromocionesService', () => {
  let service: AdminPromocionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPromocionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
