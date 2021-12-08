import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-perquisar-venda',
  templateUrl: './perquisar-venda.component.html',
  styleUrls: ['./perquisar-venda.component.scss']
})
export class PerquisarVendaComponent implements OnInit {

  constructor(
    private readonly pedidosService: PedidosService
  ) { }

  public pedidos: any[] = []
  public pedidosOriginal: any[] = []

  ngOnInit(): void {
    this.pedidosService.find().subscribe((data:any)=>{
      for(let oneData of data){
        if(oneData.tipoVenda == 0){
          this.pedidos.push(oneData)
          this.pedidosOriginal.push(oneData)
        }
      }
    })
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
}
