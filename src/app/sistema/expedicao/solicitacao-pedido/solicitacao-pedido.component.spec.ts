import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoPedidoComponent } from './solicitacao-pedido.component';

describe('SolicitacaoPedidoComponent', () => {
  let component: SolicitacaoPedidoComponent;
  let fixture: ComponentFixture<SolicitacaoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitacaoPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
