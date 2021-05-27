import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resumo-financeiro',
  templateUrl: './resumo-financeiro.component.html',
  styleUrls: ['./resumo-financeiro.component.scss']
})
export class ResumoFinanceiroComponent implements OnInit {

  public resumo: any = [
    { id: 1234, data: "21/04/2021", descricao: "alguma descrição do pedido aqui", valor: 990, status: 'pago' },
    { id: 2345, data: "27/04/2021", descricao: "alguma descrição do pedido aqui", valor: 1250.50, status: 'vencido' },
    { id: 3456, data: "18/05/2021", descricao: "alguma descrição do pedido aqui", valor: 990, status: 'pago' },
    { id: 4567, data: "19/05/2021", descricao: "alguma descrição do pedido aqui", valor: 15000, status: 'pago' },
    { id: 5678, data: "20/05/2021", descricao: "alguma descrição do pedido aqui", valor: 990, status: 'pago' },
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
