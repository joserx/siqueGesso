import { Component, OnInit, ViewChild } from '@angular/core';
import { PedidoCompraService } from '../../../../services/pedido-compra.service';
import { ViewPedidoComponent } from '../view-pedido/view-pedido.component';
import Swal from 'sweetalert2';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { Router } from '@angular/router';

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
  del: boolean = false
  create: boolean = false

  constructor(
    private pedidoCompraService: PedidoCompraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.compras_ver) == PermissionsUsers.compras_ver)){
      this.router.navigate(['sistema'])
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.compras_excluir) == PermissionsUsers.config_excluir){
      this.del = true
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.compras_editar) == PermissionsUsers.compras_editar){
      this.create = true
    }
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
