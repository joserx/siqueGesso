import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criar-ordem-expedicao',
  templateUrl: './criar-ordem-expedicao.component.html',
  styleUrls: ['./criar-ordem-expedicao.component.scss']
})
export class CriarOrdemExpedicaoComponent implements OnInit {
  public pedidos: any = [
    { codigo: "001", produto: "PLACA DE GESSO 10X10", qtd: "500", valor: "???", tipo: "Entrega", data: "09/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "002", produto: "PLACA DE GESSO 10X10", qtd: "100", valor: "???", tipo: "Entrega", data: "15/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "003", produto: "PLACA DE GESSO 10X10", qtd: "100", valor: "???", tipo: "Entrega", data: "09/06/2021", endereco: "SALGADO FILHO 2844"},
    { codigo: "004", produto: "PLACA DE GESSO 10X10", qtd: "250", valor: "???", tipo: "Retirada", data: "15/06/2021", endereco: "SALGADO FILHO 2844"},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
