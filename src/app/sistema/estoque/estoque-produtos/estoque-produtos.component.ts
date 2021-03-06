import { Component, OnInit, ViewChild } from '@angular/core';
import { EditProdutoEstoqueComponent } from './edit-produto-estoque/edit-produto-estoque.component';
import { ViewEstoqueProdutoComponent } from './view-estoque-produto/view-estoque-produto.component';
import { ProdutoService } from '../../../services/produto.service';
import Swal from 'sweetalert2';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-estoque-produtos',
  templateUrl: './estoque-produtos.component.html',
  styleUrls: ['./estoque-produtos.component.scss'],
})
export class EstoqueProdutosComponent implements OnInit {
  public produtos: any = [];
  public produtosFiltrados: any = [];
  public search: string = '';
  public produto: any;
  create: boolean = false
  del: boolean = false

  @ViewChild(EditProdutoEstoqueComponent)
  editProdutoEstoqueComponent: EditProdutoEstoqueComponent;

  @ViewChild(ViewEstoqueProdutoComponent)
  viewEstoqueProdutoComponent: any;

  constructor(private produtoService: ProdutoService) {}

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

  loadViewProduto(produto: any) {
    this.viewEstoqueProdutoComponent.loadForm(produto);
  }

  delete(produto: any) {
    let produtoObj = {
      id: produto.id,
      deleted: true,
    };
    Swal.fire({
      title: `Deseja deletar ${produto.nome}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.produtoService.delete(produtoObj).subscribe(() => {
          this.getProdutos();
          return Swal.fire({
            title: 'Produto Deletado!',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        });
      else
        Swal.fire({
          title: 'A????o cancelada!',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
    });
  }
}
