import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.scss']
})
export class EditarClientesComponent implements OnInit {

  public clienteSection: string = 'cadastro';

  constructor() { }

  ngOnInit(): void {
  }

  public toggleClienteSection(value: string): void {
    this.clienteSection = value;
  }
}
