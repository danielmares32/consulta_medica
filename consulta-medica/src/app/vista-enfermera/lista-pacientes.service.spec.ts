import { TestBed } from '@angular/core/testing';

import { ListaPacientes } from './lista-pacientes.service';

describe('ListaPacientes', () => {
  let service: ListaPacientes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPacientes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});