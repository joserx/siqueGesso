import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-filtrar-vendas',
  templateUrl: './filtrar-vendas.component.html',
  styleUrls: ['./filtrar-vendas.component.scss']
})
export class FiltrarVendasComponent implements OnInit {

  constructor(
    private readonly pedidosService: PedidosService
  ) { }
  public total: number = 0
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

  filterBeforeDate = "";
  filtrarData(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeDate.length) {
        this.pedidos = this.pedidosOriginal.filter((user : any) => {
          user.data = new Date(user.data)
          let timezone = user.data.getTimezoneOffset() * 60000
          user.data = new Date(user.data - timezone).toISOString()
          let userDate = user.data.split("T")[0]
          return userDate == str
        })
        this.filterBeforeDate = str
      } else {
        this.pedidos = this.pedidosOriginal;
        this.pedidos = this.pedidosOriginal.filter((user : any) => {
          user.data = new Date(user.data)
          let timezone = user.data.getTimezoneOffset() * 60000
          user.data = new Date(user.data - timezone).toISOString()
          let userDate = user.data.split("T")[0]
          return userDate == str
        })
        this.filterBeforeDate = str
      }
    } else {
      this.pedidos = this.pedidosOriginal;
    }
  }

  filterBefore = "";
  filtrarLoja(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.pedidos = this.pedidosOriginal.filter((user : any) => `${user.loja}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.pedidos = this.pedidosOriginal;
        this.pedidos = this.pedidosOriginal.filter((user : any) => `${user.loja}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.pedidos = this.pedidosOriginal;
    }
  }

  filterBeforeVendedor = "";
  filtrarVendedor(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeVendedor.length) {
        this.pedidos = this.pedidosOriginal.filter((user : any) => `${user.vendedor}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeVendedor = str
      } else {
        this.pedidos = this.pedidosOriginal;
        this.pedidos = this.pedidosOriginal.filter((user : any) => `${user.vendedor}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeVendedor = str
      }
    } else {
      this.pedidos = this.pedidosOriginal;
    }
  }

  filterBeforeCliente = "";
  filtrarCliente(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeCliente.length) {
        this.pedidos = this.pedidosOriginal.filter((user : any) => `${user.cliente}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeCliente = str
      } else {
        this.pedidos = this.pedidosOriginal;
        this.pedidos = this.pedidosOriginal.filter((user : any) => `${user.cliente}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeCliente = str
      }
    } else {
      this.pedidos = this.pedidosOriginal;
    }
  }

  filterBeforeTotal = 0;
  filtrarTotal(event : any) {
    let str = Number((event.target.value.substring(3,event.target.value.length).replace(",", ".")).replace(".", ""));
    str.toFixed(2)
    if(Number(str) != 0) {
      if(String(str).length > String(this.filterBeforeTotal).length) {
        this.pedidos = this.pedidosOriginal.filter((user : any) => `${user.total}`.toUpperCase().includes((String(str).toUpperCase())))
        this.filterBeforeTotal = str
      } else {
        this.pedidos = this.pedidosOriginal;
        this.pedidos = this.pedidosOriginal.filter((user : any) => `${user.total}`.toUpperCase().includes((String(str).toUpperCase())))
        this.filterBeforeTotal = str
      }
    } else {
      this.pedidos = this.pedidosOriginal;
    }
  }

  filterBeforeStatus = "";
  filtrarStatus(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeStatus.length) {
        this.pedidos = this.pedidosOriginal.filter((user : any) => `${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeStatus = str
      } else {
        this.pedidos = this.pedidosOriginal;
        this.pedidos = this.pedidosOriginal.filter((user : any) => `${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeStatus = str
      }
    } else {
      this.pedidos = this.pedidosOriginal;
    }
  }
}
