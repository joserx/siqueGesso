import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-usuarios-sistema',
  templateUrl: './listar-usuarios-sistema.component.html',
  styleUrls: ['./listar-usuarios-sistema.component.scss']
})
export class ListarUsuariosSistemaComponent implements OnInit {

  public usuarios = [
    { id: 1, nome: 'Michael', sobrenome: 'B. Jordan', email: 'michael.jordan@siquegesso.com', permissao: 'Administrador' },
    { id: 2, nome: 'Ricardo', sobrenome: 'Botega', email: 'ricardo.botega@siquegesso.com', permissao: 'Administrador' },
    { id: 3, nome: 'Thais', sobrenome: 'Camila', email: 'thais.camila@siquegesso.com', permissao: 'Administrador' },
    { id: 4, nome: 'Deise', sobrenome: 'Teixeira', email: 'deise.teixeira@siquegesso.com', permissao: 'Administrador' },
    { id: 5, nome: 'Henrique', sobrenome: 'Bustillos', email: 'deise.teixeira@siquegesso.com', permissao: 'Administrador' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
