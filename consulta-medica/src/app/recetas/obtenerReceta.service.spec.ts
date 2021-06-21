import { TestBed } from '@angular/core/testing';

import { ObtenerReceta } from './obtenerReceta.service';

describe('ObtenerReceta', () => {
  let service: ObtenerReceta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerReceta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});