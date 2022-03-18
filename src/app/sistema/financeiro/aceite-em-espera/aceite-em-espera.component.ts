import { Component, OnInit } from '@angular/core';
import { PedidoCompraService } from 'src/app/services/pedido-compra.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-aceite-em-espera',
  templateUrl: './aceite-em-espera.component.html',
  styleUrls: ['./aceite-em-espera.component.scss'],
})
export class AceiteEmEsperaComponent implements OnInit {
  public pedidos: any = [];
  public pedido: any;
  public pedidosFiltrados: any = [];

  constructor(private pedidoCompraService: PedidoCompraService) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos() {
    this.pedidoCompraService.find().subscribe((res) => {
      this.pedidoCompraService.pedidos = res;
      this.pedidos = res;
      this.pedidosFiltrados = this.pedidos.filter((item: any) => !item.aceite)
      console.log(this.pedidos);
    });
  }

  confirmaPedido(pedido: any) {
    Swal.fire({
      title: `Aceitar o pedido ${pedido.id}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed) {
        pedido.aceite = true;
        this.pedidoCompraService.update(pedido).subscribe(() => {
          this.pedidosFiltrados = this.pedidosFiltrados.filter((item: any) => item.id != pedido.id)
          return Swal.fire({
            title: 'Pedido Aceito!',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        });
      } else
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
