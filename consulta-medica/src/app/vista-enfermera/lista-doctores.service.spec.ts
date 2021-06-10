import { TestBed } from '@angular/core/testing';

import { ListaDoctores } from './lista-doctores.service';

describe('ListaDoctores', () => {
  let service: ListaDoctores;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDoctores);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});