import { Component, OnInit } from '@angular/core';
import { CategoriaProdutoService } from 'src/app/services/categoria-produto.service';

@Component({
  selector: 'app-cadastro-de-produto-lista',
  templateUrl: './cadastro-de-produto-lista.component.html',
  styleUrls: ['./cadastro-de-produto-lista.component.scss'],
})
export class CadastroDeProdutoListaComponent implements OnInit {
  public categoria: any;
  public categorias: any;

  constructor(private CategoriaProdutoService: CategoriaProdutoService) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.CategoriaProdutoService.find().subscribe((res) => {
      this.CategoriaProdutoService.categoria = res;
      this.categoria = res;
      this.categorias = this.categoria;
      console.log(res);
    });
  }
}
