import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estoque-produtos',
  templateUrl: './estoque-produtos.component.html',
  styleUrls: ['./estoque-produtos.component.scss']
})
export class EstoqueProdutosComponent implements OnInit {

  public produtos: any = [
    { id: 1, nome: "Placa cimentícea", dados: [
      { data: "18/05/2021", movimento: "Entrada", fornecedor: "Fornecedor 1", valor_unitario: 40, quantidade: 500, custo: 20000, disponivel: 500 },
      { data: "18/05/2021", movimento: "Entrada", fornecedor: "Fornecedor 1", valor_unitario: 40, quantidade: 500, custo: 20000, disponivel: 500 },
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
