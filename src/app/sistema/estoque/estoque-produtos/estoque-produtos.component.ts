import { Component, OnInit, ViewChild } from '@angular/core';
import { EditProdutoEstoqueComponent } from './edit-produto-estoque/edit-produto-estoque.component';
import { ProdutoService } from '../../../services/produto.service';
import Swal from 'sweetalert2';

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
  delete(produto: any) {
    console.log(produto);

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
          title: 'Ação cancelada!',
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
