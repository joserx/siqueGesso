import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-de-produto-lista',
  templateUrl: './cadastro-de-produto-lista.component.html',
  styleUrls: ['./cadastro-de-produto-lista.component.scss']
})
export class CadastroDeProdutoListaComponent implements OnInit {
  produtos = [
    {},{},{},{},{},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
