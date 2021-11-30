import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-filtrar-clientes',
  templateUrl: './filtrar-clientes.component.html',
  styleUrls: ['./filtrar-clientes.component.scss']
})
export class FiltrarClientesComponent implements OnInit {

  public clientes : any[] = []
  public clienteOriginal: any;

  constructor(private readonly clientService : ClientService) { 
    this.clientService.find().subscribe((data : any) => {
      this.clientes = data
      this.clienteOriginal = data
    })
  }

  ngOnInit(): void {
  }
  typeClient(value: any): string{
    console.log(value)
    if(value.name==null){
      return 'juridica'
    }else{
      return 'fisica'
    }
  }

  filterBeforeNome = "";
  filtrarNome(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeNome.length) {
        this.clientes = this.clienteOriginal.filter((user : any) => `${user.name} ${user.surname} ${user.fantasyName}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeNome = str
      } else {
        this.clientes = this.clienteOriginal;
        this.clientes = this.clienteOriginal.filter((user : any) => `${user.name} ${user.surname} ${user.fantasyName}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeNome = str
      }
    } else {
      this.clientes = this.clienteOriginal;
    }
  }

  filterBeforEmail = "";
  filtrarEmail(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforEmail.length) {
        this.clientes = this.clienteOriginal.filter((user : any) => `${user.email}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforEmail = str
      } else {
        this.clientes = this.clienteOriginal;
        this.clientes = this.clienteOriginal.filter((user : any) => `${user.email}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforEmail = str
      }
    } else {
      this.clientes = this.clienteOriginal;
    }
  }

  filterBeforTelefone = "";
  filtrarTelefone(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforTelefone.length) {
        this.clientes = this.clienteOriginal.filter((user : any) => `${user.telephone}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforTelefone = str
      } else {
        this.clientes = this.clienteOriginal;
        this.clientes = this.clienteOriginal.filter((user : any) => `${user.telephone}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforTelefone = str
      }
    } else {
      this.clientes = this.clienteOriginal;
    }
  }
  

}
