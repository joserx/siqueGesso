import { Component, OnInit } from '@angular/core';
import { CategoriaProdutoService } from 'src/app/services/categoria-produto.service';

@Component({
  selector: 'app-filtro-categorias',
  templateUrl: './filtro-categorias.component.html',
  styleUrls: ['./filtro-categorias.component.scss'],
})
export class FiltroCategoriasComponent implements OnInit {
  public categoria: any;
  public categorias: any;
  categoriasFiltradas: any = [];
  constructor(private CategoriaProdutoService: CategoriaProdutoService) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.CategoriaProdutoService.find().subscribe((res) => {
      this.CategoriaProdutoService.categorias = res;
      this.categorias = res;
      this.categoriasFiltradas = this.categorias;
      console.log(res);
    });
  }
}
