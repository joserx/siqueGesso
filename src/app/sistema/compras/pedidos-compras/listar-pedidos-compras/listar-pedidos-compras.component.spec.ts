import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPedidosComprasComponent } from './listar-pedidos-compras.component';

describe('ListarPedidosComprasComponent', () => {
  let component: ListarPedidosComprasComponent;
  let fixture: ComponentFixture<ListarPedidosComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPedidosComprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPedidosComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
