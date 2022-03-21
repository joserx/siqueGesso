import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-pesquisar-cliente',
  templateUrl: './pesquisar-cliente.component.html',
  styleUrls: ['./pesquisar-cliente.component.scss']
})
export class PesquisarClienteComponent implements OnInit {

  public clientes : any[] = []
  public clienteOriginal: any;
  create: boolean = false

  constructor(private readonly clientService : ClientService) { 
    this.clientService.find().subscribe((data : any) => {
      this.clientes = data
      this.clienteOriginal = data
    })
  }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_ver) == PermissionsUsers.vendas_ver)){
      this.create = true
    }
  }
  typeClient(value: any): string{
    console.log(value)
    if(value.name==null){
      return 'juridica'
    }else{
      return 'fisica'
    }
  }
  filterBefore = "";
  filtrar(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.clientes = this.clienteOriginal.filter((user : any) => `${user.name} ${user.surname} ${user.fantasyName}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.clientes = this.clienteOriginal;
        this.clientes = this.clienteOriginal.filter((user : any) => `${user.name} ${user.surname} ${user.fantasyName}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.clientes = this.clienteOriginal;
    }
  }
}
