import { Component, OnInit, ViewChild } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedores.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { ProdutoService } from 'src/app/services/produto.service';
import { ViewProdutoComponent } from './view-produto/view-produto.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  @ViewChild(ViewProdutoComponent)
  viewProdutoComponent: any;

  public editSuprimentoComponent: any;
  public produtos: any;
  public produto: any;
  public produtosFiltrados: any = [];
  public search: string = '';
  create: boolean = false
  del: boolean = false

  constructor(
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.estoque_excluir) == PermissionsUsers.estoque_excluir){
      this.del = true
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.estoque_editar) == PermissionsUsers.estoque_editar){
      this.create = true
    }
    this.getProdutos();
  }
  pesquisaProdutos() {
    if (this.search.length > 0)
      this.produtosFiltrados = this.produtos.filter((produtoF: any) =>
        produtoF.nome.includes(this.search)
      );
    else this.produtosFiltrados = this.produtos;
  }

  getProdutos() {
    this.produtoService.find().subscribe((res) => {
      this.produtoService.produtos = res;
      this.produtos = res;
      this.produtosFiltrados = this.produtos;
      console.log(res);
    });
  }

  loadProdutoView(produto: any) {
    this.viewProdutoComponent.loadForm(produto);
  }
}
