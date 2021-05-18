import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent implements OnInit {


  public notificacoes = [
    { nome: "Notificação 1", value: "notificacao1", tipos: [
      { nome: "Tipo 1" },
      { nome: "Tipo 2" },
      { nome: "Tipo 3" },
    ]},
    { nome: "Notificação 2", value: "notificacao2", tipos: [
      { nome: "Tipo 1" },
      { nome: "Tipo 2" },
      { nome: "Tipo 3" },
    ]},
    { nome: "Notificação 3", value: "notificacao3", tipos: [
      { nome: "Tipo 1" },
      { nome: "Tipo 2" },
      { nome: "Tipo 3" },
    ]},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
