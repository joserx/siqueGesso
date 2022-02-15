import { Component, OnInit } from '@angular/core';
import {CategoriaFornecedorService} from 'src/app/services/categoria-fornecedor.service'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categoria-fornecedor',
  templateUrl: './categoria-fornecedor.component.html',
  styleUrls: ['./categoria-fornecedor.component.scss']
})
export class CategoriaFornecedorComponent implements OnInit {
  public categoria: any;
  public categorias: any[] = [];
  public search: string = '';
  public categoriasFiltradas: any[] = [];
  data: any = {};


  constructor(private CategoriaFornecedorService: CategoriaFornecedorService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  mudarStatus(categoria: any) {
    if (categoria.status == true) categoria.status = false;
    else categoria.status = true;
    this.CategoriaFornecedorService.update(categoria.id, categoria).subscribe();
  }

  pesquisaCategoria() {
    if (this.search.length > 0)
      this.categoriasFiltradas = this.categorias.filter((categoriaF: any) =>
        categoriaF.nome.includes(this.search)
      );
    else this.categoriasFiltradas = this.categoria;
  }

  getCategorias(){
    this.CategoriaFornecedorService.findAll().subscribe((res)=>{
      this.CategoriaFornecedorService.categorias = res;
      this.categorias = res;
      this.categoriasFiltradas = this.categorias;
    })
  }

  getCategoriasF(status?:boolean){
    this.CategoriaFornecedorService.find(status).subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (err) => {},
      () => {}
    );
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
        this.CategoriaFornecedorService.delete(categoria.id).subscribe(() => {
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
