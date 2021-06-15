import { TestBed } from '@angular/core/testing';

import { RegistroLab } from './registroLab.service';

describe('RegistroLab', () => {
  let service: RegistroLab;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroLab);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});