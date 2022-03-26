import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss'],
})
export class VendasComponent implements OnInit {
  public pedidos: any[] = [];
  public originalPedidos: any[] = [];
  public obs: any;
  public showSign: boolean;
  public pedido: any;
  public motivacao: string;
  public pedidoId: string

  pedidoSelected: boolean = false;

  public cards = [
    { nome: 'Vendas', icon: 'bi-cash-coin', href: '/sistema/vendas/pedidos' },
    {
      nome: 'Vendas Diretas',
      icon: 'bi-truck',
      href: '/sistema/vendas/vendas-diretas/listar',
    },
    {
      nome: 'Clientes',
      icon: 'bi-person-circle',
      href: '/sistema/vendas/clientes',
    },
  ];

  constructor(
    private router: Router,
    private readonly pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    if (
      !(
        (JSON.parse(localStorage.getItem('currentUser') as any).result
          .permission.permission &
          PermissionsUsers.vendas_ver) ==
        PermissionsUsers.vendas_ver
      )
    ) {
      this.router.navigate(['sistema']);
    }
    this.getPedidos();
  }

  getPedidos() {
    this.pedidosService.find().subscribe((res) => {
      this.pedidosService.pedidos = res;
      this.pedidos = res;
      this.originalPedidos = res;
    });
  }

  selectProposta() {
    if (this.obs == 'Proposta aprovada') {
      this.obs = false;
    }
  }

  filterBeforePedido = Number;
  filtrarPedido(event: any) {
    this.showSign = true;

    let str = event.target.value;

    if (str != '') {
      if (str.length > this.filterBeforePedido.length) {
        this.pedidos = this.originalPedidos.filter((pedido: any) =>
          pedido.id.toString().includes(str)
        );
        this.filterBeforePedido = str;
      } else {
        this.pedidos = this.originalPedidos;
        this.pedidos = this.originalPedidos.filter((pedido: any) =>
          pedido.id.toString().includes(str)
        );
        this.filterBeforePedido = str;
      }
      if (this.pedidos.length == 0) {
        this.showSign = false;
      }
    } else {
      this.pedidos = this.originalPedidos;
      this.showSign = false;
    }
  }

  selectPedido(pedido: any) {
    this.pedidoId = pedido.id
    this.pedido = pedido;
    this.pedidoSelected = true;
    this.showSign = false;
  }

  submit() {
    const pedido = { ...this.pedido, obs: this.motivacao };
    this.pedidosService.update(pedido.id, pedido).subscribe((res) => {
      console.log(res);
    });
  }
}
