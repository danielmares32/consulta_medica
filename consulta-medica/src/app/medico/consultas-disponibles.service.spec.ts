import { TestBed } from '@angular/core/testing';

import { ConsultasDisponiblesService } from './consultas-disponibles.service';

describe('ConsultasDisponiblesService', () => {
  let service: ConsultasDisponiblesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultasDisponiblesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
