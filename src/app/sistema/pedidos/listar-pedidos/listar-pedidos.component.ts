import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.scss']
})
export class ListarPedidosComponent implements OnInit {

  public pedidos = [
    { id: 1, data: '18/02/2021', loja: 'Matriz', vendedor: 'Ricardo Botega', cliente: 'Empreiteira ABC', valor: 20000, status: 'Gerado' },
    { id: 2, data: '19/02/2021', loja: 'Matriz', vendedor: 'Thais Camila', cliente: 'Empreiteira ABC', valor: 25500, status: 'Gerado' },
    { id: 3, data: '20/02/2021', loja: 'Matriz', vendedor: 'Deise Teixeira', cliente: 'Empreiteira ABC', valor: 23125.25, status: 'Digitação' },
    { id: 4, data: '21/02/2021', loja: 'Matriz', vendedor: 'Henrique Bustillos', cliente: 'Empreiteira ABC', valor: 24200, status: 'Digitação' },
    { id: 5, data: '23/02/2021', loja: 'Matriz', vendedor: 'Douglas Brito', cliente: 'Empreiteira ABC', valor: 23550, status: 'Digitação' },
    { id: 6, data: '25/02/2021', loja: 'Matriz', vendedor: 'Michael Jordan', cliente: 'The Walt Disney Company', valor: 1175930.50, status: 'Gerado' },
  ]

  public dados = { gerados: { valor: 100000, qtd: 72 }, digitacao: { valor: 20000, qtd: 10 } }

  constructor() { }

  ngOnInit(): void {
  }

}