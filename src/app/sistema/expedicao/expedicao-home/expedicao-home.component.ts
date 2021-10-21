import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expedicao-home',
  templateUrl: './expedicao-home.component.html',
  styleUrls: ['./expedicao-home.component.scss']
})
export class ExpedicaoHomeComponent implements OnInit {

  public cards = [
    { nome: "Solicitação de pedido", icon: "bi-bell-fill", href: "//sistema/expedicao/solicitacao" },
    { nome: "Lista de pedidos", icon: "bi-list-ol", href: "//sistema/expedicao/lista" },
    { nome: "Consulta status", icon: "bi-search", href: "" },
    { nome: "Cadastro motorista", icon: "bi-truck", href:"" },
    { nome: "Não conform. e status", icon: "bi-card-text", href:"" },
    { nome: "Baixa de entrega", icon: "bi-box-seam", href:"" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
