import { TestBed } from '@angular/core/testing';

import { VtserviceService } from './vtservice.service';

describe('VtserviceService', () => {
  let service: VtserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VtserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
