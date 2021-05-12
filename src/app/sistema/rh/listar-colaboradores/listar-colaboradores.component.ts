import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-colaboradores',
  templateUrl: './listar-colaboradores.component.html',
  styleUrls: ['./listar-colaboradores.component.scss']
})
export class ListarColaboradoresComponent implements OnInit {

  public colaboradores = [
    { id: 1, nome: 'Michael', sobrenome: 'B. Jordan', cargo: 'Diretor', departamento: 'Marketing', admissao: '08/02/2020', loja: 'Matriz', status: 0 },
    { id: 2, nome: 'Ricardo', sobrenome: 'Botega', cargo: 'Auxiliar', departamento: 'Expedição', admissao: '08/02/2020', loja: 'São Bernardo', status: 1 },
    { id: 3, nome: 'Thais', sobrenome: 'Camila', cargo: 'Estoquista', departamento: 'Comercial', admissao: '08/02/2020', loja: 'Itaqua', status: 1 },
    { id: 4, nome: 'Deise', sobrenome: 'Teixeira', cargo: 'Estoquista', departamento: 'Expedição', admissao: '08/02/2020', loja: 'Matriz', status: 1 },
    { id: 5, nome: 'Henrique', sobrenome: 'Bustillos', cargo: 'Vendedor', departamento: 'Comercial', admissao: '08/02/2020', loja: 'Matriz', status: 1 },
  ]

  public dados = { ativos: 72, inativos: 10 }

  constructor() { }

  ngOnInit(): void {
  }

}
