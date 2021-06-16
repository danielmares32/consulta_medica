import { TestBed } from '@angular/core/testing';

import { RegistroCService } from './registroC.service';

describe('RegistroCService', () => {
  let service: RegistroCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 