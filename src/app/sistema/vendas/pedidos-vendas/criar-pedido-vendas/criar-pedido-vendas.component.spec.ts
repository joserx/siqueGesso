import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPedidoVendasComponent } from './criar-pedido-vendas.component';

describe('CriarPedidoVendasComponent', () => {
  let component: CriarPedidoVendasComponent;
  let fixture: ComponentFixture<CriarPedidoVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarPedidoVendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarPedidoVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
