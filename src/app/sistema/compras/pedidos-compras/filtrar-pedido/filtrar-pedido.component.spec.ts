import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarPedidoComponent } from './filtrar-pedido.component';

describe('FiltrarPedidoComponent', () => {
  let component: FiltrarPedidoComponent;
  let fixture: ComponentFixture<FiltrarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrarPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
