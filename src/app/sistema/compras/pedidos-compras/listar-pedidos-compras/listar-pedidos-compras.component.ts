import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pedidos-compras',
  templateUrl: './listar-pedidos-compras.component.html',
  styleUrls: ['./listar-pedidos-compras.component.scss']
})
export class ListarPedidosComprasComponent implements OnInit {

  public pedidos: any = [
    { codigo: 1, data: "14/06/2021", fornecedor: "Fornecedor 1", total: 30000 },
    { codigo: 2, data: "27/06/2021", fornecedor: "Fornecedor 1", total: 40000 },
    { codigo: 3, data: "26/06/2021", fornecedor: "Fornecedor 1", total: 45000 },
    { codigo: 4, data: "12/06/2021", fornecedor: "Fornecedor 1", total: 15000 },
    { codigo: 5, data: "15/06/2021", fornecedor: "Fornecedor 1", total: 30000 },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
