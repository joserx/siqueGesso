import { Component, OnInit, ViewChild } from '@angular/core';
import { EditProdutoEstoqueComponent } from './edit-produto-estoque/edit-produto-estoque.component';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-estoque-produtos',
  templateUrl: './estoque-produtos.component.html',
  styleUrls: ['./estoque-produtos.component.scss'],
})
export class EstoqueProdutosComponent implements OnInit {
  public produtos: any = [];
  public produtosFiltrados: any = [];
  public search: string = '';

  @ViewChild(EditProdutoEstoqueComponent)
  editProdutoEstoqueComponent: EditProdutoEstoqueComponent;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.getProdutos();
  }
  pesquisaProdutos() {
    if (this.search.length > 0)
      this.produtosFiltrados = this.produtos.filter((produto: any) =>
        produto.nome.includes(this.search)
      );
    else this.produtosFiltrados = this.produtos;
  }

  getProdutos() {
    this.produtoService.find().subscribe((res) => {
      this.produtoService.produtos = res;
      this.produtos = res;
      this.produtosFiltrados = this.produtos;
    });
  }

  loadProduto(produto: any) {
    this.editProdutoEstoqueComponent.loadForm(produto);
  }
}
