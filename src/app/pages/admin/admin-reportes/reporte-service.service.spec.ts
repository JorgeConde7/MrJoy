import { TestBed } from '@angular/core/testing';

import { ReporteServiceService } from '../../../core/apis/admin/reporte-service.service';

describe('ReporteServiceService', () => {
  let service: ReporteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
