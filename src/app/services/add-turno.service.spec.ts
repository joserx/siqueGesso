import { TestBed } from '@angular/core/testing';

import { AddTurnoService } from './add-turno.service';

describe('AddTurnoService', () => {
  let service: AddTurnoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTurnoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
