import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.scss']
})
export class DetalhesProdutoComponent implements OnInit {

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
