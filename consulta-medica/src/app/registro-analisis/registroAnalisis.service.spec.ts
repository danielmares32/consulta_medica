import { TestBed } from '@angular/core/testing';

import { RegistroAnalisis } from './registroAnalisis.service';

describe('RegistroAnalisis', () => {
  let service: RegistroAnalisis;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroAnalisis);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});