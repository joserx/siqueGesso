import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-cadastro-loja',
  templateUrl: './listar-cadastro-loja.component.html',
  styleUrls: ['./listar-cadastro-loja.component.scss']
})
export class ListarCadastroLojaComponent implements OnInit {

  lojas = [
    {},{},{},{},{},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
