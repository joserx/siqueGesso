import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoCompraService } from '../../../../services/pedido-compra.service';
import { ViewPedidoComponent } from '../view-pedido/view-pedido.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-pedidos-compras',
  templateUrl: './listar-pedidos-compras.component.html',
  styleUrls: ['./listar-pedidos-compras.component.scss'],
})
export class ListarPedidosComprasComponent implements OnInit {
  @ViewChild(ViewPedidoComponent)
  viewPedidoComponent: ViewPedidoComponent;

  public pedidos: any = [];
  public pedido: any;
  public pedidosFiltrados: any = [];
  public search: string = '';

  constructor(private pedidoCompraService: PedidoCompraService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  pesquisaPedidos() {
    if (this.search.length > 0)
      this.pedidosFiltrados = this.pedidos.filter((pedidoF: any) =>
        pedidoF.fornecedor.includes(this.search)
      );
    else this.pedidosFiltrados = this.pedidos;
  }

  getPedidos() {
    this.pedidoCompraService.find().subscribe((res) => {
      this.pedidoCompraService.pedidos = res;
      this.pedidos = res;
      this.pedidosFiltrados = this.pedidos;
      console.log(this.pedidos);
    });
  }

  loadPedido(pedido: any) {
    this.viewPedidoComponent.loadForm(pedido);
  }

  confirmaPedido(pedido: any) {
    if (confirm('deseja mesmo liberar esse pedido?')) {
      pedido.aceite = true;
      this.pedidoCompraService.update(pedido).subscribe();
    }
  }

  delete(pedido: any) {
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
            title: 'Pedido Deletado!',
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
