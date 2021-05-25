import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selecionar-produtos-modal',
  templateUrl: './selecionar-produtos-modal.component.html',
  styleUrls: ['./selecionar-produtos-modal.component.scss']
})
export class SelecionarProdutosModalComponent implements OnInit {

  public produtos: any = [
    { codigo: 1, nome: "Placa Cimentícia", estoque: "3000", custo: 20, venda: 80, margem: 300},
    { codigo: 2, nome: "Placa Cimentícia", estoque: "3000", custo: 20, venda: 80, margem: 300},
    { codigo: 3, nome: "Placa Cimentícia", estoque: "3000", custo: 20, venda: 80, margem: 300},
    { codigo: 4, nome: "Placa Cimentícia", estoque: "3000", custo: 20, venda: 80, margem: 300},
    { codigo: 5, nome: "Placa Cimentícia", estoque: "3000", custo: 20, venda: 80, margem: 300},
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
