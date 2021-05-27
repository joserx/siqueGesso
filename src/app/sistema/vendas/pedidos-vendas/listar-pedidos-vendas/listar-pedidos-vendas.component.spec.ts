import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPedidosVendasComponent } from './listar-pedidos-vendas.component';

describe('ListarPedidosVendasComponent', () => {
  let component: ListarPedidosVendasComponent;
  let fixture: ComponentFixture<ListarPedidosVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPedidosVendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPedidosVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
