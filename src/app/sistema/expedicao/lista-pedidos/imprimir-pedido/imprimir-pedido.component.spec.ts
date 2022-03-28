import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirPedidoComponent } from './imprimir-pedido.component';

describe('ImprimirPedidoComponent', () => {
  let component: ImprimirPedidoComponent;
  let fixture: ComponentFixture<ImprimirPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
