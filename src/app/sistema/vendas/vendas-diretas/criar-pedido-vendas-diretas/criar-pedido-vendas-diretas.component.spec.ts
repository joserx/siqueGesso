import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPedidoVendasDiretasComponent } from './criar-pedido-vendas-diretas.component';

describe('CriarPedidoVendasDiretasComponent', () => {
  let component: CriarPedidoVendasDiretasComponent;
  let fixture: ComponentFixture<CriarPedidoVendasDiretasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarPedidoVendasDiretasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarPedidoVendasDiretasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
