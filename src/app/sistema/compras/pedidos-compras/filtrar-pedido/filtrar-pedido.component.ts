import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtrar-pedido',
  templateUrl: './filtrar-pedido.component.html',
  styleUrls: ['./filtrar-pedido.component.scss'],
})
export class FiltrarPedidoComponent implements OnInit {
  @Input() pedidos: Array<any> = [];
  @Input() pedidosOriginal: Array<any> = [];
  @Output() pedidosFiltrados = new EventEmitter<any>();

  valorTotal: any = 0;

  constructor() {}

  ngOnInit(): void {}

  filtrarData(event: any) {
    const data = event.target.value;
    if (data) {
      this.pedidos = this.pedidosOriginal.filter(
        (pedido) => pedido.data == data
      );
    } else {
      this.pedidos = this.pedidosOriginal;
    }
  }

  filtrarValor(event: any) {
    const valor = event.target.value;
    this.valorTotal = valor;
    if (valor) {
      this.pedidos = this.pedidosOriginal.filter(
        (pedido) => pedido.valorTotal == valor
      );
    } else {
      this.pedidos = this.pedidosOriginal;
    }
  }

  filtrarStatus(event: any) {
    const status = event.target.value;
    if (status) {
      this.pedidos = this.pedidosOriginal.filter(
        (pedido) => pedido.status == status
      );
    } else {
      this.pedidos = this.pedidosOriginal;
    }
  }
}
