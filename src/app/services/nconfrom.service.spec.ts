import { TestBed } from '@angular/core/testing';

import { NconfromService } from './nconfrom.service';

describe('NconfromService', () => {
  let service: NconfromService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NconfromService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
