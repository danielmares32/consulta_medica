import { TestBed } from '@angular/core/testing';

import { ActualizarExpedienteService } from './actualizar-expediente.service';

describe('ActualizarExpedienteService', () => {
  let service: ActualizarExpedienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarExpedienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
