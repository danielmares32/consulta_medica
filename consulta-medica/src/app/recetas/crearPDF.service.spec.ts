import { TestBed } from '@angular/core/testing';

import { CrearPDF } from './crearPDF.service';

describe('CrearPDF', () => {
  let service: CrearPDF;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearPDF);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});