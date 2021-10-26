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
    { nome: "Consulta status", icon: "bi-search", href: "//sistema/expedicao/consulta" },
    { nome: "Cadastro", icon: "bi-person-lines-fill", href:"//sistema/expedicao/cadastro" },
    { nome: "Não conform. e status", icon: "bi-card-text", href:"" },
    { nome: "Baixa de entrega", icon: "bi-box-seam", href:"" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
