import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-pedidos-realizados',
  templateUrl: './pedidos-realizados.component.html',
  styleUrls: ['./pedidos-realizados.component.scss']
})
export class EditarPedidosRealizadosComponent implements OnInit {

  clientId : number = 0;
  public pedidos: any = [
    { id: 1234, data: "21/04/2021", referencia: "???", descricao: "alguma descrição do pedido aqui", quantidade: 451, preco: 970.50, valor: 990, total: 1234 },
    { id: 2345, data: "27/04/2021", referencia: "???", descricao: "alguma descrição do pedido aqui", quantidade: 451, preco: 970.50, valor: 990, total: 1234 },
    { id: 3456, data: "18/05/2021", referencia: "???", descricao: "alguma descrição do pedido aqui", quantidade: 451, preco: 970.50, valor: 990, total: 1234 },
    { id: 4567, data: "19/05/2021", referencia: "???", descricao: "alguma descrição do pedido aqui", quantidade: 451, preco: 970.50, valor: 990, total: 1234 },
    { id: 5678, data: "20/05/2021", referencia: "???", descricao: "alguma descrição do pedido aqui", quantidade: 451, preco: 970.50, valor: 990, total: 1234 },
  ]

  public anos: any = [ 2015, 2016, 2017, 2018, 2019, 2020, 2021 ]

  constructor(
    private readonly route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.clientId = Number(routeParams.get('id'));
    console.log(this.clientId)
  }

}
