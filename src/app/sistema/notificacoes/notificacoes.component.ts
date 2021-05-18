import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent implements OnInit {


  public notificacoesEmail = [
    { nome: "Notificação 1", value: "notificacaoEmail1", tipos: [
      { nome: "Tipo 1" },
      { nome: "Tipo 2" },
      { nome: "Tipo 3" },
    ]},
    { nome: "Notificação 2", value: "notificacaoEmail2", tipos: [
      { nome: "Tipo 1" },
      { nome: "Tipo 2" },
      { nome: "Tipo 3" },
    ]},
    { nome: "Notificação 3", value: "notificacaoEmail3", tipos: [
      { nome: "Tipo 1" },
      { nome: "Tipo 2" },
      { nome: "Tipo 3" },
    ]},
  ]

  public notificacoesSique = [
    { nome: "Notificação 1", value: "notificacaoSique1", tipos: [
      { nome: "Tipo 1" },
      { nome: "Tipo 2" },
      { nome: "Tipo 3" },
    ]},
    { nome: "Notificação 2", value: "notificacaoSique2", tipos: [
      { nome: "Tipo 1" },
      { nome: "Tipo 2" },
      { nome: "Tipo 3" },
    ]},
    { nome: "Notificação 3", value: "notificacaoSique3", tipos: [
      { nome: "Tipo 1" },
      { nome: "Tipo 2" },
      { nome: "Tipo 3" },
    ]},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
