import { Component, OnInit } from '@angular/core';
import { getDate } from '../../../../../environments/global';

@Component({
  selector: 'app-criar-pedido-vendas-diretas',
  templateUrl: './criar-pedido-vendas-diretas.component.html',
  styleUrls: ['./criar-pedido-vendas-diretas.component.scss'],
})
export class CriarPedidoVendasDiretasComponent implements OnInit {
  public getDate: any = getDate;

  public lojas: any = [
    {
      id: 1,
      razao_social: 'Loja 1',
      cnpj: '123456789',
      cep: '12345-123',
      endereco: 'Rua Doná Olinda de Albuquerque, 60',
      complemento: '',
    },
    {
      id: 2,
      razao_social: 'Loja 2',
      cnpj: '234234234',
      cep: '23451-231',
      endereco: 'Rua Doná Olinda de Albuquerque, 123',
      complemento: '',
    },
    {
      id: 3,
      razao_social: 'Loja 3',
      cnpj: '345345345',
      cep: '64532-123',
      endereco: 'Rua Doná Olinda de Albuquerque, 234',
      complemento: '',
    },
  ];

  public fornecedorSelecionado: any = {
    id: null,
    razao_social: '',
    cnpj: '',
    cep: '',
    endereco: '',
    complemento: '',
  };

  public vendedores: any = [
    {
      id: 1,
      razao_social: 'Vendedor 1',
      cnpj: '123456789',
      cep: '12345-123',
      endereco: 'Rua Doná Olinda de Albuquerque, 60',
      complemento: '',
    },
    {
      id: 2,
      razao_social: 'Vendedor 2',
      cnpj: '234234234',
      cep: '23451-231',
      endereco: 'Rua Doná Olinda de Albuquerque, 123',
      complemento: '',
    },
    {
      id: 3,
      razao_social: 'Vendedor 3',
      cnpj: '345345345',
      cep: '64532-123',
      endereco: 'Rua Doná Olinda de Albuquerque, 234',
      complemento: '',
    },
  ];

  public pedido: any = {
    quantidade_itens: 2,
    quantidade_total: 150,
    venda: 3.00,
    frete: 2.00,
    total_preco: 1000.00,
  };
  public itensPedido: any = [
    {
      codigo: 1,
      nome: 'Parafuso',
      quantidade: 100,
      valor_unitario: 5,
      valor_venda: 20,
      frete_unitario: 50,
      total_por_produto: 500,
    },
    {
      codigo: 2,
      nome: 'Drywall',
      quantidade: 200,
      valor_unitario: 10,
      valor_venda: 40,
      frete_unitario: 100,
      total_por_produto: 1000,
    },
  ];

  public produtos: any = [
    {
      codigo: 1,
      nome: 'Parafuso',
      quantidade: 100,
      valor_unitario: 5,
      subtotal: 20.9,
    },
    {
      codigo: 2,
      nome: 'Drywall',
      quantidade: 100,
      valor_unitario: 5,
      subtotal: 20.9,
    },
    {
      codigo: 3,
      nome: 'Gesso',
      quantidade: 100,
      valor_unitario: 5,
      subtotal: 20.9,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.atualizarTotalPedido();
  }

  public adicionarItemPedido(): void {
    // this.itensPedido.push({ })
    this.itensPedido.push({
      codigo: this.itensPedido.length + 1,
      nome: '',
      quantidade: '',
      valor_unitario: '',
      subtotal: '',
    });
  }

  public atualizarTotalPedido(): void {
    this.pedido.total =
      this.pedido.subtotal -
      this.pedido.desconto +
      this.pedido.frete +
      this.pedido.encargos;
  }

  public atualizarSubtotalProduto(qtd: any, codigo: any) {
    // Atualizando o item
    this.itensPedido.map((itemPedido: any, i: any) => {
      if (itemPedido.codigo == codigo) {
        this.itensPedido[i].quantidade = parseInt(qtd.value);
        this.itensPedido[i].subtotal =
          this.itensPedido[i].quantidade * this.itensPedido[i].valor_unitario;
      }
    });

    // Atualizando o subtotal do pedido
    let subtotal = 0;
    this.itensPedido.forEach((item: any) => {
      subtotal += item.quantidade * item.valor_unitario;
    });
    this.pedido.subtotal = subtotal;

    this.atualizarTotalPedido();
  }

  public setLojaSelecionada(id: any): void {
    this.lojas.forEach((fornecedor: any) => {
      if (this.lojas.id == id) {
        this.fornecedorSelecionado = this.lojas;
      }
    });
  }

  public setVendedorSelecionado(id: any): void {
    this.vendedores.forEach((fornecedor: any) => {
      if (this.vendedores.id == id) {
        this.fornecedorSelecionado = this.vendedores;
      }
    });
  }

  //insere o valor unitário no objeto
  insereValorNoObj(valor: any, codigo: any) {
    let valorRecebido = valor.target.value;

    this.itensPedido.map((itemPedido: any, i: any) => {
      if (itemPedido.codigo == codigo) {
        console.log('item pedido', itemPedido);
        this.itensPedido[i].valor_unitario = parseInt(valorRecebido);
      }
    });
  }
}
