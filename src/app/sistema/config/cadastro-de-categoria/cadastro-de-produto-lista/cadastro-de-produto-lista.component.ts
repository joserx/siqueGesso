import { Component, OnInit } from '@angular/core';
import { CategoriaProdutoService } from 'src/app/services/categoria-produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-de-produto-lista',
  templateUrl: './cadastro-de-produto-lista.component.html',
  styleUrls: ['./cadastro-de-produto-lista.component.scss'],
})
export class CadastroDeProdutoListaComponent implements OnInit {
  public categoria: any;
  public categorias: any;
  public search: string = '';
  public categoriasFiltradas: any = [];

  constructor(private CategoriaProdutoService: CategoriaProdutoService) {}

  ngOnInit(): void {
    this.getCategorias();
  }
  mudarStatus(categoria: any) {
    if (categoria.status == true) categoria.status = false;
    else categoria.status = true;
    this.CategoriaProdutoService.update(categoria.id, categoria).subscribe();
  }

  pesquisaCategoria() {
    if (this.search.length > 0)
      this.categoriasFiltradas = this.categorias.filter((categoriaF: any) =>
        categoriaF.nome.includes(this.search)
      );
    else this.categoriasFiltradas = this.categoria;
  }

  getCategorias() {
    this.CategoriaProdutoService.find().subscribe((res) => {
      this.CategoriaProdutoService.categorias = res;
      this.categorias = res;
      this.categoriasFiltradas = this.categorias;
      console.log(res);
    });
  }

  deleteCategoria(categoria: any) {
    Swal.fire({
      title: `Deseja deletar ${categoria.nome}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.CategoriaProdutoService.delete(categoria.id).subscribe(() => {
          this.getCategorias();
          return Swal.fire({
            title: 'Categoria Deletada!',
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
