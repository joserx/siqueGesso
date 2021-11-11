import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  public cards = [
    { nome: "Vendas", icon: "bi-cash-coin", href: "/sistema/vendas/pedidos" },
    { nome: "Vendas Diretas", icon: "bi-truck", href: "/sistema/vendas/vendas-diretas/listar" },
    { nome: "Clientes", icon: "bi-person-circle", href: "/sistema/vendas/clientes" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
