import { TestBed } from '@angular/core/testing';

import { HistorialConsultasService } from './historial-consultas.service';

describe('HistorialConsultasService', () => {
  let service: HistorialConsultasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialConsultasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
