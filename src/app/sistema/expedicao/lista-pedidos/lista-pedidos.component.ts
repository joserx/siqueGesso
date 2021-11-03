import { Component, OnInit } from '@angular/core';
import { EmbarqueService } from 'src/app/services/embarque.service';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.scss']
})
export class ListaPedidosComponent implements OnInit {

  public status: boolean = false
  public solicitacoes: any = []
  public solicitacoesOriginal: any = []
  public filter: any = []
  public filterOriginal: any = []

  constructor(
    private readonly solicitacaoService: SolicitacaoService,
  ) { }

  ngOnInit(): void {
    this.solicitacaoService.find().subscribe((data:any)=>{
      this.solicitacoes = data
      this.solicitacoesOriginal = data
      this.filter = data
      this.filterOriginal = data
    })
  }

  filterBefore = "";
  filtrar(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.solicitacoes = this.solicitacoesOriginal.filter((user : any) => `${user.numero} ${user.cliente} ${user.vendedor} ${new Date(user.data)} ${user.valor} ${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.solicitacoes = this.solicitacoesOriginal;
        this.solicitacoes = this.solicitacoesOriginal.filter((user : any) => `${user.numero} ${user.cliente} ${user.vendedor} ${new Date(user.data)} ${user.valor} ${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.solicitacoes = this.solicitacoesOriginal;
    }
  }

  filterBeforeDate = "";
  filtrarDate(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeDate.length) {
        this.filter = this.filterOriginal.filter((user : any) => {
          user.data = new Date(user.data)
          let timezone = user.data.getTimezoneOffset() * 60000
          user.data = new Date(user.data - timezone).toISOString()
          let userDate = user.data.split("T")[0]
          return userDate == str
        })
        this.filterBeforeDate = str
      } else {
        this.filter = this.filterOriginal;
        this.filter = this.filterOriginal.filter((user : any) => {
          user.data = new Date(user.data)
          let timezone = user.data.getTimezoneOffset() * 60000
          user.data = new Date(user.data - timezone).toISOString()
          let userDate = user.data.split("T")[0]
          return userDate == str
        })
        this.filterBeforeDate = str
      }
    } else {
      this.filter = this.filterOriginal;
    }
  }

  filterBeforeStatus = "";
  filtrarStatus(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.filter = this.filterOriginal.filter((user : any) => `${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.filter = this.filterOriginal;
        this.filter = this.filterOriginal.filter((user : any) => `${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.filter = this.filterOriginal;
    }
  }
  
  filterBeforeVendedor = "";
  filtrarVendedor(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.filter = this.filterOriginal.filter((user : any) => `${user.vendedor}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.filter = this.filterOriginal;
        this.filter = this.filterOriginal.filter((user : any) => `${user.vendedor}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.filter = this.filterOriginal;
    }
  }

  turnToTrue(){
    this.status = true
  }

  turnToFalse(){
    this.status = false
  }

}
