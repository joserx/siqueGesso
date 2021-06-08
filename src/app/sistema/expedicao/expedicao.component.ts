import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expedicao',
  templateUrl: './expedicao.component.html',
  styleUrls: ['./expedicao.component.scss']
})
export class ExpedicaoComponent implements OnInit {

  public ordens = [
    { dataCriacao: '05/05/2021', numOrdem: "001", pedido: "001", dataDespacho: "06/05/2021", status: "Aguardando" },
    { dataCriacao: '10/05/2021', numOrdem: "002", pedido: "003", dataDespacho: "10/05/2021", status: "Aguardando"},
    { dataCriacao: '15/05/2021', numOrdem: "003", pedido: "004", dataDespacho: "15/05/2021", status: "Aguardando"},
    { dataCriacao: '21/05/2021', numOrdem: "004", pedido: "005", dataDespacho: "22/05/2021", status: "Aguardando" },
    { dataCriacao: '23/05/2021', numOrdem: "005", pedido: "006", dataDespacho: "23/05/2021", status: "Aguardando"},
    { dataCriacao: '25/05/2021', numOrdem: "006", pedido: "007", dataDespacho: "25/05/2021", status: "Aguardando"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
