import { Component, OnInit } from '@angular/core';
import { getDate } from '../../../../environments/global';

@Component({
  selector: 'app-criar-pedido',
  templateUrl: './criar-pedido.component.html',
  styleUrls: ['./criar-pedido.component.scss']
})
export class CriarPedidoComponent implements OnInit {

  public getDate: any = getDate;
  public desconto: number = 10;

  public itens: any = [
    { codigo: 1, produto: 'Drywall', quantidade: 50, valor_unitario: 25.90, desconto_tab: 5, desconto_ad: 0, valor_venda: 20.90 },
    { codigo: 2, produto: 'Gesso', quantidade: 4, valor_unitario: 16.90, desconto_tab: 0, desconto_ad: 0, valor_venda: 16.90 },
  ];

  public clientes: any = [
    { nome: "Ricardo Botega" },
    { nome: "Douglas Brito" },
    { nome: "Deise Teixeira" },
    { nome: "Thais Camila" },
    { nome: "Michael B. Jordan" },
    { nome: "Finger Digital" },
  ]

  public resumo: any = { produtos: 2, unidades: 600, subtotal: 6000, descontos: 100, venda: 5900, frete: 300, total: 6200 };

  constructor() { }

  ngOnInit(): void {
  }

  public log(x: any): void {
    console.log(x);
  }

}
