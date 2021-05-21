import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  public cards = [
    { nome: "Pedidos", icon: "bi-list-ul", href: "/sistema/vendas/pedidos" },
    { nome: "Clientes", icon: "bi-person-circle", href: "/sistema/vendas/clientes" },
  ]

  constructor() { }

  ngOnInit(): void {
  }
  
}
