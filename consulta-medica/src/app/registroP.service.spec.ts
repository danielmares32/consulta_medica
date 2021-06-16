import { TestBed } from '@angular/core/testing';

import { RegistroPService } from './registroP.service';

describe('RegistroPService', () => {
  let service: RegistroPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 