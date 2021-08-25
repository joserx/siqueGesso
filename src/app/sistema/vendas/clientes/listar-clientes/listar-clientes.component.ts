import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss']
})
export class ListarClientesComponent implements OnInit {

  public clientes : any[] = []

  constructor(
    private readonly clientService : ClientService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.clientService.find().subscribe((data : any) => {
      this.clientes = data
    })
  }
  typeClient(value: any): string{
    console.log(value)
    if(value.name==null){
      return 'juridica'
    }else{
      return 'fisica'
    }
  }

}
