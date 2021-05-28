import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-produtos',
  templateUrl: './adicionar-produtos.component.html',
  styleUrls: ['./adicionar-produtos.component.scss']
})
export class AdicionarProdutosComponent implements OnInit {

  public fornecedoresPadrao: any = [{}];

  constructor() { }

  ngOnInit(): void {
  }

  public adicionarFornecedorPadrao(): any {
    this.fornecedoresPadrao.push({});
  }

}
