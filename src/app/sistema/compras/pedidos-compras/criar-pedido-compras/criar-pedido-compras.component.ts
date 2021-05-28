import { Component, OnInit } from '@angular/core';
import { getDate } from '../../../../../environments/global';

@Component({
  selector: 'app-criar-pedido-compras',
  templateUrl: './criar-pedido-compras.component.html',
  styleUrls: ['./criar-pedido-compras.component.scss']
})
export class CriarPedidoComprasComponent implements OnInit {

  public getDate: any = getDate;

  public fornecedores: any = [
    { id: 1, razao_social: "Fornecedor 1", cnpj: "123456789", cep: "12345-123", endereco: "Rua Doná Olinda de Albuquerque, 60", complemento: "" },
    { id: 2, razao_social: "Fornecedor 2", cnpj: "234234234", cep: "23451-231", endereco: "Rua Doná Olinda de Albuquerque, 123", complemento: "" },
    { id: 3, razao_social: "Fornecedor 3", cnpj: "345345345", cep: "64532-123", endereco: "Rua Doná Olinda de Albuquerque, 234", complemento: "" },
  ]

  public fornecedorSelecionado: any = { id: null, razao_social: "", cnpj: "", cep: "", endereco: "", complemento: "" }

  public pedido: any = {
    subtotal: 1500,
    desconto: 100,
    frete: 150,
    encargos: 30,
    total: 0
  }
  public itensPedido: any = [
    { codigo: 1, nome: 'Parafuso', quantidade: 100, valor_unitario: 5, subtotal: 500 },
    { codigo: 2, nome: 'Drywall', quantidade: 100, valor_unitario: 10, subtotal: 1000 },
  ]

  public produtos: any = [
    { codigo: 1, nome: 'Parafuso', quantidade: 100, valor_unitario: 5, subtotal: 20.90 },
    { codigo: 2, nome: 'Drywall', quantidade: 100, valor_unitario: 5, subtotal: 20.90 },
    { codigo: 3, nome: 'Gesso', quantidade: 100, valor_unitario: 5, subtotal: 20.90 },
  ]

  constructor() { }

  ngOnInit(): void {
    this.atualizarTotalPedido()
  }
  
  public atualizarTotalPedido(): void {
    this.pedido.total = this.pedido.subtotal - this.pedido.desconto + this.pedido.frete + this.pedido.encargos;
  }

  public atualizarSubtotalProduto(qtd: any, codigo: any) {
    // Atualizando o item
    this.itensPedido.map((itemPedido: any, i: any) => {
      if (itemPedido.codigo == codigo) {
        this.itensPedido[i].quantidade = parseInt(qtd.value);
        this.itensPedido[i].subtotal = this.itensPedido[i].quantidade * this.itensPedido[i].valor_unitario
      }
    });

    // Atualizando o subtotal do pedido
    let subtotal = 0;
    this.itensPedido.forEach((item: any) => {
      subtotal += item.quantidade * item.valor_unitario;
    })
    this.pedido.subtotal = subtotal;

    this.atualizarTotalPedido();
  }

  public setFornecedorSelecionado(id: any): void {
    this.fornecedores.forEach((fornecedor: any) => {
      if (fornecedor.id == id) {
        this.fornecedorSelecionado = fornecedor;
      }
    });
  }

}
