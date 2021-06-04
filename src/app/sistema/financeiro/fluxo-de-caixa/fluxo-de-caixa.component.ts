import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fluxo-de-caixa',
  templateUrl: './fluxo-de-caixa.component.html',
  styleUrls: ['./fluxo-de-caixa.component.scss']
})
export class FluxoDeCaixaComponent implements OnInit {

  public total: number = 578000;

  public recebimentos: any = [
    { data: "21/05/2021", descricao: "Aqui alguma breve descrição", total: 600, situacao: "Em aberto"},
    { data: "20/05/2021", descricao: "Aqui alguma breve descrição", total: 1555.55, situacao: "Em aberto"},
    { data: "15/05/2021", descricao: "Aqui alguma breve descrição", total: 125, situacao: "Concluído"},
    { data: "12/05/2021", descricao: "Aqui alguma breve descrição", total: 600, situacao: "Em aberto"},
    { data: "11/05/2021", descricao: "Aqui alguma breve descrição", total: 135, situacao: "Concluído"},
    { data: "10/05/2021", descricao: "Aqui alguma breve descrição", total: 551, situacao: "Concluído"},
    { data: "25/04/2021", descricao: "Aqui alguma breve descrição", total: 765.50, situacao: "Concluído"},
    { data: "24/04/2021", descricao: "Aqui alguma breve descrição", total: 925.75, situacao: "Concluído"},
    { data: "24/04/2021", descricao: "Aqui alguma breve descrição", total: 600, situacao: "Concluído"},
  ]

  public pagamentos: any = [
    { data: "21/05/2021", descricao: "Aqui alguma breve descrição", total: 600, situacao: "Em aberto"},
    { data: "20/05/2021", descricao: "Aqui alguma breve descrição", total: 1555.55, situacao: "Em aberto"},
    { data: "15/05/2021", descricao: "Aqui alguma breve descrição", total: 125, situacao: "Concluído"},
    { data: "12/05/2021", descricao: "Aqui alguma breve descrição", total: 600, situacao: "Em aberto"},
    { data: "11/05/2021", descricao: "Aqui alguma breve descrição", total: 135, situacao: "Concluído"},
    { data: "10/05/2021", descricao: "Aqui alguma breve descrição", total: 551, situacao: "Concluído"},
    { data: "25/04/2021", descricao: "Aqui alguma breve descrição", total: 765.50, situacao: "Concluído"},
    { data: "24/04/2021", descricao: "Aqui alguma breve descrição", total: 925.75, situacao: "Concluído"},
    { data: "24/04/2021", descricao: "Aqui alguma breve descrição", total: 600, situacao: "Concluído"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
