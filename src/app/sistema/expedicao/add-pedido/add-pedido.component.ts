import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.component.html',
  styleUrls: ['./add-pedido.component.scss']
})
export class AddPedidoComponent implements OnInit {

  /* 
  ::::::::::::::::::::::::::::::
  ::-----------vars-----------::
  ::::::::::::::::::::::::::::::
  */
 
  @Output() value: EventEmitter<any> = new EventEmitter()
  public pedidos: any = [
    {numero: 123456, data: "06/10/2021", vendedor: "Guilherme", loja: "Sique Gesso", cliente: "Ricardo"},
    {numero: 789101, data: "07/10/2021", vendedor: "Rodrigo Finger", loja: "Sique Gesso", cliente: "Henrique"},
    {numero: 654321, data: "08/10/2021", vendedor: "Felipe Katho", loja: "Sique Gesso", cliente: "Thais"},
  ]
  public pedidosOriginais: any = [
    {numero: 123456, data: "06/10/2021", vendedor: "Guilherme", loja: "Sique Gesso", cliente: "Ricardo"},
    {numero: 789101, data: "07/10/2021", vendedor: "Rodrigo Finger", loja: "Sique Gesso", cliente: "Henrique"},
    {numero: 654321, data: "08/10/2021", vendedor: "Felipe Katho", loja: "Sique Gesso", cliente: "Thais"},
  ]



  /* 
  :::::::::::::::::::::::::::::
  ::-------constructor-------::
  :::::::::::::::::::::::::::::
  */

  constructor() { }

  ngOnInit(): void {
  }

  filterBefore = "";
  filtrar(event: any){
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.pedidos = this.pedidosOriginais.filter((user : any) => `${user.numero} ${user.data.substring(10,0)} ${user.vendedor} ${user.loja} ${user.cliente}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.pedidos = this.pedidosOriginais;
        this.pedidos = this.pedidosOriginais.filter((user : any) => `${user.numero} ${user.data.substring(10,0)} ${user.vendedor} ${user.loja} ${user.cliente}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.pedidos = this.pedidosOriginais;
    }
  }

}
