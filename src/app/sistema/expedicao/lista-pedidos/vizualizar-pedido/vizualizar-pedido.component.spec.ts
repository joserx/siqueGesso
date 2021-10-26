import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarPedidoComponent } from './vizualizar-pedido.component';

describe('VizualizarPedidoComponent', () => {
  let component: VizualizarPedidoComponent;
  let fixture: ComponentFixture<VizualizarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VizualizarPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VizualizarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
