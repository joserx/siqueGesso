import { TestBed } from '@angular/core/testing';

import { PedidoGeradoService } from './pedido-gerado.service';

describe('PedidoGeradoService', () => {
  let service: PedidoGeradoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoGeradoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
