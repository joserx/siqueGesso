import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-suprimentos',
  templateUrl: './adicionar-suprimentos.component.html',
  styleUrls: ['./adicionar-suprimentos.component.scss']
})
export class AdicionarSuprimentosComponent implements OnInit {

  public listaFornecedores: any = [
    { nome: "Fornecedor 1" },
    { nome: "Fornecedor 2" },
    { nome: "Fornecedor 3" },
    { nome: "Fornecedor 4" },
  ]

  public fornecedoresUsuais: any = [{}];

  constructor() { }

  ngOnInit(): void {
  }

  public adicionarFornecedorUsual(): any {
    this.fornecedoresUsuais.push({});
  }

}
