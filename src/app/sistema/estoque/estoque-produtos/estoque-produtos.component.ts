import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estoque-produtos',
  templateUrl: './estoque-produtos.component.html',
  styleUrls: ['./estoque-produtos.component.scss']
})
export class EstoqueProdutosComponent implements OnInit {

  public estoque_produtos: any = [
    { codigo: 1, nome: "Placa cimentícea", unidade_medida: "unidades", custo: 40, valor_venda: 80, estoque: 500, total: 20000 },
    { codigo: 2, nome: "Placa cimentícea", unidade_medida: "unidades", custo: 40, valor_venda: 80, estoque: 500, total: 20000 },
    { codigo: 3, nome: "Placa cimentícea", unidade_medida: "unidades", custo: 40, valor_venda: 80, estoque: 500, total: 20000 },
    { codigo: 4, nome: "Placa cimentícea", unidade_medida: "unidades", custo: 40, valor_venda: 80, estoque: 500, total: 20000 },
    { codigo: 5, nome: "Placa cimentícea", unidade_medida: "unidades", custo: 40, valor_venda: 80, estoque: 500, total: 20000 },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
