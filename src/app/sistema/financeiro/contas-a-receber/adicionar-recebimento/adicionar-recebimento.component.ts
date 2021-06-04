import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-recebimento',
  templateUrl: './adicionar-recebimento.component.html',
  styleUrls: ['./adicionar-recebimento.component.scss']
})
export class AdicionarRecebimentoComponent implements OnInit {

  public valorTotal: number = 10000;

  constructor() { }

  ngOnInit(): void {
  }

}
