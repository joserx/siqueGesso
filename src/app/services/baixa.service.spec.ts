import { TestBed } from '@angular/core/testing';

import { BaixaService } from './baixa.service';

describe('BaixaService', () => {
  let service: BaixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaixaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
