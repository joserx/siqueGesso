import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-listar-vendas-diretas',
  templateUrl: './listar-vendas-diretas.component.html',
  styleUrls: ['./listar-vendas-diretas.component.scss'],
})
export class ListarVendasDiretasComponent implements OnInit {

  public pedidos: any[] = []
  public pedidosOriginal: any[] = []
  public pages: any[] = []
  public pagesNumber: number
  public atualPageNumber: number = 0
  public atualPage: any[] = []
  create: boolean = false

  constructor(
    private readonly pedidosService: PedidosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_ver) == PermissionsUsers.vendas_ver)){
      this.router.navigate(['sistema'])
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_editar) == PermissionsUsers.vendas_editar){
      this.create = true
    }
    this.pedidosService.find().subscribe((data: any)=>{
      for(let oneData of data){
        if(oneData.tipoVenda == 1){
          this.pedidos.push(oneData)
          this.pedidosOriginal.push(oneData)
        }
      }
    }, (err)=>{
      console.log(err)
    }, ()=>{
      for(let control = 0; control <= this.pedidos.length; control++){
        this.pedidosService.findByPage([control + "1"]).subscribe((data:any)=>{
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
    this.pedidosService.findByPage([0 + "1"]).subscribe((data:any)=>{
      this.atualPage = data
      console.log('atualPage', data)
    })
  }

  totalValue(value: any): number{
    let total: number = 0
    for(let data of value){
      total += Number(data.total)
    }
    return total
  }

  filterBefore = "";
  filtrar(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.pedidos = this.pedidosOriginal.filter((user : any) => `${user.id} ${user.data} ${user.loja} ${user.vendedor} ${user.cliente} ${user.total} ${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.pedidos = this.pedidosOriginal;
        this.pedidos = this.pedidosOriginal.filter((user : any) =>  `${user.id} ${user.data} ${user.loja} ${user.vendedor} ${user.cliente} ${user.total} ${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.pedidos = this.pedidosOriginal;
    }
  }

  proximo(){
    if(this.atualPageNumber < (Object.keys(this.pages).length - 1)){
      this.atualPageNumber++
      this.pedidosService.findByPage([this.atualPageNumber + "1"]).subscribe((data:any)=>{
        this.atualPage = data
      })
    }
  }
  anterior(){
    console.log(Object.keys(this.pages).length - 1)
    if(this.atualPageNumber <= (Object.keys(this.pages).length - 1) && this.atualPageNumber > 0){
      this.atualPageNumber--
      this.pedidosService.findByPage([this.atualPageNumber + "1"]).subscribe((data:any)=>{
        this.atualPage = data
      })
    }
  }
}
