import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public clienteSection: string = 'cadastro';

  constructor() { }

  ngOnInit(): void {
  }

  public toggleClienteSection(value: string): void {
    this.clienteSection = value;
  }

}
