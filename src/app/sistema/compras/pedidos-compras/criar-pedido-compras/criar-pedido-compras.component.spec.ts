import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPedidoComprasComponent } from './criar-pedido-compras.component';

describe('CriarPedidoComprasComponent', () => {
  let component: CriarPedidoComprasComponent;
  let fixture: ComponentFixture<CriarPedidoComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarPedidoComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarPedidoComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
