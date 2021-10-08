import { TestBed } from '@angular/core/testing';

import { ExpedicaoService } from './expedicao.service';

describe('ExpedicaoService', () => {
  let service: ExpedicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
