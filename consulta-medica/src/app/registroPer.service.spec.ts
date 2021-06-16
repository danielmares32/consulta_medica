import { TestBed } from '@angular/core/testing';

import { RegistroPerService } from './registroPer.service';

describe('RegistroPerService', () => {
  let service: RegistroPerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroPerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
}); 