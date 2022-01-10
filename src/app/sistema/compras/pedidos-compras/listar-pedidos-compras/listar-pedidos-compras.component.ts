import { Component, OnInit } from '@angular/core';
import { PedidoCompraService } from '../../../../services/pedido-compra.service';

@Component({
  selector: 'app-listar-pedidos-compras',
  templateUrl: './listar-pedidos-compras.component.html',
  styleUrls: ['./listar-pedidos-compras.component.scss'],
})
export class ListarPedidosComprasComponent implements OnInit {
  public pedidos: any = [];
  public pedidosFiltrados: any = [];
  public search: string = '';

  constructor(private pedidoCompraService: PedidoCompraService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  pesquisaPedidos() {
    if (this.search.length > 0)
      this.pedidosFiltrados = this.pedidos.filter((pedidoF: any) => {
        pedidoF.nome.inclues(this.search);
      });
  }

  getPedidos() {
    this.pedidoCompraService.find().subscribe((res) => {
      this.pedidoCompraService.pedidos = res;
      this.pedidos = res;
      this.pedidosFiltrados = this.pedidos;
    });
  }
}
