import { Component, OnInit } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedores.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos: any
  produto: any
  
  constructor(
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    if (!this.fornecedorService.fornecedores)
      this.fornecedorService.find().subscribe(res => {
        this.fornecedorService.fornecedores = res
      })
    this.getProdutos()
  }

  getProdutos(){
    this.produtoService.find().subscribe(res => {
      this.produtos = res
    })
  }

  selectProduto(produto: any){
    this.produto = produto
  }

}
