import { Component, OnInit } from '@angular/core';
import { PedidoCompraService } from '../../../../services/pedido-compra.service';

@Component({
  selector: 'app-listar-pedidos-compras',
  templateUrl: './listar-pedidos-compras.component.html',
  styleUrls: ['./listar-pedidos-compras.component.scss'],
})
export class ListarPedidosComprasComponent implements OnInit {
  public pedidos: any = [];
  constructor(private pedidoCompraService: PedidoCompraService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos() {
    this.pedidoCompraService.find().subscribe((res) => {
      this.pedidoCompraService.pedidos = res;
      this.pedidos = res;
    });
  }
}
