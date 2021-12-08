import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-listar-vendas-diretas',
  templateUrl: './listar-vendas-diretas.component.html',
  styleUrls: ['./listar-vendas-diretas.component.scss'],
})
export class ListarVendasDiretasComponent implements OnInit {

  public pedidos: any[] = []
  public pedidosOriginal: any[] = []

  constructor(
    private readonly pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    this.pedidosService.find().subscribe((data: any)=>{
      for(let oneData of data){
        if(oneData.tipoVenda == 1){
          this.pedidos.push(oneData)
          this.pedidosOriginal.push(oneData)
        }
      }
    })
  }

  totalValue(value: any): number{
    let total: number = 0
    for(let data of value){
      total += data.total
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
}
