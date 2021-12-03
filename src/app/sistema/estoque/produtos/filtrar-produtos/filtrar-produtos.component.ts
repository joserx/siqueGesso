import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtrar-produtos',
  templateUrl: './filtrar-produtos.component.html',
  styleUrls: ['./filtrar-produtos.component.scss'],
})
export class FiltrarProdutosComponent implements OnInit {
  @Input() produtos: Array<any> = [];
  @Input() produtosOriginal: Array<any> = [];
  @Output() produtosFiltrados = new EventEmitter<any>();

  filterBeforeEstoque = '';
  filterBefore = '';
  filterBeforeMargem = '';
  custo: any = 0;

  constructor() {}

  ngOnInit(): void {}

  filtrarEstoque(event: any) {
    const estoque = event.target.value;
    if (estoque) {
      this.produtos = this.produtosOriginal.filter(
        (produto) => produto.atual == estoque
      );
    } else {
      this.produtos = this.produtosOriginal;
    }
  }

  filtrarCusto(event: any) {
    const custo = event.target.value;
    this.custo = custo;
    if (custo) {
      const valorCusto = custo.replace(/\D/g, '');
      this.produtos = this.produtosOriginal.filter(
        (produto) => produto.custoMedio == valorCusto
      );
    } else {
      this.produtos = this.produtosOriginal;
    }
  }

  filtrarMargem(event: any) {
    const margem = event.target.value;
    if (margem) {
      this.produtos = this.produtosOriginal.filter(
        (produto) => produto.margemLucro == margem
      );
    } else {
      this.produtos = this.produtosOriginal;
    }
  }
}
