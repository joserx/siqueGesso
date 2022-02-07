import { Component, OnInit } from '@angular/core';
import { CategoriaProdutoService } from 'src/app/services/categoria-produto.service';

@Component({
  selector: 'app-filtro-categorias',
  templateUrl: './filtro-categorias.component.html',
  styleUrls: ['./filtro-categorias.component.scss'],
})
export class FiltroCategoriasComponent implements OnInit {
  categoria: any[] = [];
  categorias: any[] = [];
  categoriasFiltradas: any = [];
  data: any = {};

  constructor(private CategoriaProdutoService: CategoriaProdutoService) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(status?: boolean) {
    this.CategoriaProdutoService.find(status).subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (err) => {},
      () => {}
    );
  }
}
