import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/services/client.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.scss']
})
export class ListarClientesComponent implements OnInit {

  public clientes : any[] = []
  public pedidos: any[] = []
  public pages: any[] = []
  public pagesNumber: number
  public atualPageNumber: number = 0
  public atualPage: any[] = []
  create: boolean = false

  constructor(
    private readonly clientService : ClientService,
    private modalService: NgbModal, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_ver) == PermissionsUsers.vendas_ver)){
      this.router.navigate(['sistema'])
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_editar) == PermissionsUsers.vendas_editar){
      this.create = true
    }
    this.clientService.find().subscribe((data : any) => {
      this.clientes = data
    }, (err)=>{
      console.log(err)
    }, ()=>{
      for(let control = 0; control <= this.clientes.length; control++){
        this.clientService.findByPage(control).subscribe((data:any)=>{
          if(data.length > 0){
            this.pages.push(data)
          }
        }, (err)=>{
          console.log(err)
        }, ()=>{
          this.pagesNumber = Object.keys(this.pages).length
        })
      }
    })
    this.clientService.findByPage(0).subscribe((data:any)=>{
      this.atualPage = data
    })
  }
  typeClient(value: any): string{
    if(value.name==null){
      return 'juridica'
    }else{
      return 'fisica'
    }
  }

  proximo(){
    if(this.atualPageNumber < (Object.keys(this.pages).length - 1)){
      this.atualPageNumber++
      this.clientService.findByPage(this.atualPageNumber).subscribe((data:any)=>{
        this.atualPage = data
      })
    }
  }
  anterior(){
    if(this.atualPageNumber <= (Object.keys(this.pages).length - 1) && this.atualPageNumber > 0){
      this.atualPageNumber--
      this.clientService.findByPage(this.atualPageNumber).subscribe((data:any)=>{
        this.atualPage = data
      })
    }
  }

}
