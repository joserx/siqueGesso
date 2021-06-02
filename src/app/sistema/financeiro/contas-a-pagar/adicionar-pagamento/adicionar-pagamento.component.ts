import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-pagamento',
  templateUrl: './adicionar-pagamento.component.html',
  styleUrls: ['./adicionar-pagamento.component.scss']
})
export class AdicionarPagamentoComponent implements OnInit {

  public valorTotal: number = 5000;
  
  constructor() { }

  ngOnInit(): void {
  }

}
