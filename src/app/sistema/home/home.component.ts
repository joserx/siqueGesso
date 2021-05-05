import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public cards = [
    { nome: "Vendas", icon: "bi-shop", href: "" },
    { nome: "Compras", icon: "bi-cart4", href: "" },
    { nome: "Estoque", icon: "bi-box-seam", href: "" },
    { nome: "Financeiro", icon: "bi-file-earmark-bar-graph", href: "" },
    { nome: "Expedição", icon: "bi-truck", href: "" },
    { nome: "RH", icon: "bi-person-lines-fill", href: "" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
