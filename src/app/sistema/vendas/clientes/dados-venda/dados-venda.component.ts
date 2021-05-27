import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dados-venda',
  templateUrl: './dados-venda.component.html',
  styleUrls: ['./dados-venda.component.scss']
})
export class DadosVendaComponent implements OnInit {

  public condicoes: any = [
    { id: 1, value: "debito", nome: "Débito", status: "liberado" },
    { id: 2, value: "credito-vista", nome: "Crédito à vista", status: "liberado" },
    { id: 3, value: "credito-prazo", nome: "Crédito a prazo", status: "aguardando" },
    { id: 4, value: "boleto-vista", nome: "Boleto à vista", status: "liberado" },
    { id: 5, value: "boleto-ddl", nome: "Boleto DDL", status: "aguardando" },
  ]

  public tipoUsuario = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
