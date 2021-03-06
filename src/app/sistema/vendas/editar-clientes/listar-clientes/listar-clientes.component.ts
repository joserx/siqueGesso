import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-editar-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss']
})
export class EditarListarClientesComponent implements OnInit {

  public clientes : any[] = []

  constructor(
    private readonly clientService : ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.find().subscribe((data : any) => {
      this.clientes = data
    })
  }

}
