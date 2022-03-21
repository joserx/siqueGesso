import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PedidoCompraService } from 'src/app/services/pedido-compra.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-filtrar-pedido',
  templateUrl: './filtrar-pedido.component.html',
  styleUrls: ['./filtrar-pedido.component.scss'],
})
export class FiltrarPedidoComponent implements OnInit {
  @Input() pedidos: Array<any> = [];
  public pedido: any;

  @Input() pedidosOriginal: Array<any> = [];
  @Output() pedidosFiltrados = new EventEmitter<any>();

  valorTotal: any = 0;
  del: boolean = false

  constructor(private pedidoCompraService: PedidoCompraService) {}

  ngOnInit(): void {
    this.getPedidos();
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.compras_excluir) == PermissionsUsers.compras_ver){
      this.del = true
    }
  }

  getPedidos() {
    this.pedidoCompraService.find().subscribe((res) => {
      this.pedidoCompraService.pedidos = res;
      this.pedidos = res;
    });
  }

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

  deletePedido(pedido: any) {
    console.log(pedido);

    Swal.fire({
      title: `Deseja deletar ${pedido.id}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.pedidoCompraService.delete(pedido.id).subscribe(() => {
          this.getPedidos();
          return Swal.fire({
            title: 'Produto Deletado!',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        });
      else
        Swal.fire({
          title: 'Ação cancelada!',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
    });
  }
}
