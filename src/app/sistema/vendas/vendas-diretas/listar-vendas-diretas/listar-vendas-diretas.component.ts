import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-vendas-diretas',
  templateUrl: './listar-vendas-diretas.component.html',
  styleUrls: ['./listar-vendas-diretas.component.scss'],
})
export class ListarVendasDiretasComponent implements OnInit {
  public pedidos: any = [
    {
      codigo: 1,
      data: '14/06/2021',
      loja: 'Loja 1',
      vendedor: 'teste1',
      cliente: 'teste1',
      valor: 30000,
    },
    {
      codigo: 2,
      data: '27/06/2021',
      loja: 'Loja 2',
      vendedor: 'teste2',
      cliente: 'teste2',
      valor: 40000,
    },
    {
      codigo: 3,
      data: '26/06/2021',
      loja: 'Loja 3',
      vendedor: 'teste3',
      cliente: 'teste3',
      valor: 45000,
    },
    {
      codigo: 4,
      data: '12/06/2021',
      loja: 'Loja 4',
      vendedor: 'teste4',
      cliente: 'teste4',
      valor: 15000,
    },
    {
      codigo: 5,
      data: '15/06/2021',
      loja: 'Loja 5',
      vendedor: 'teste5',
      cliente: 'teste5',
      valor: 30000,
    },
  ];

  public dados = {
    gerados: { valor: 100000, qtd: 72 },
    digitacao: { valor: 20000, qtd: 10 },
  };

  constructor() {}

  ngOnInit(): void {}
}
