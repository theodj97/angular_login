import { TestBed } from '@angular/core/testing';

import { PasswdHashService } from './passwd-hash.service';

describe('PasswdHashService', () => {
  let service: PasswdHashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswdHashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
