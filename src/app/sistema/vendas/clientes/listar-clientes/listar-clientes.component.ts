import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss']
})
export class ListarClientesComponent implements OnInit {

  public clientes = [
    { id: 1, nome: "Ricardo Botega", email: "ricardo.botega@siquegesso.com.br", telefone: "11 9 9999-9999" },
    { id: 2, nome: "Michael B. Jordan", email: "michael.jordan@siquegesso.com.br", telefone: "11 9 9999-9999" },
    { id: 3, nome: "Finger Digital", email: "finger@fingerdigital.com.br", telefone: "11 9 9999-9999" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
