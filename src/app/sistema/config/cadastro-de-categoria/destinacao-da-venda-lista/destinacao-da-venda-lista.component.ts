import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destinacao-da-venda-lista',
  templateUrl: './destinacao-da-venda-lista.component.html',
  styleUrls: ['./destinacao-da-venda-lista.component.scss']
})
export class DestinacaoDaVendaListaComponent implements OnInit {
  destinacoes = [{},{},{},{},{},]

  constructor() { }

  ngOnInit(): void {
  }

}
