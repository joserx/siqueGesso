import { TestBed } from '@angular/core/testing';

import { VtService } from './vt.service';

describe('VtService', () => {
  let service: VtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
