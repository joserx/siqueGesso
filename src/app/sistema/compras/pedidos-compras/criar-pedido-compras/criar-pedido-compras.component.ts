import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { getDate } from '../../../../../environments/global';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FornecedorService } from 'src/app/services/fornecedores.service';
import { ProdutoService } from '../../../../services/produto.service';

@Component({
  selector: 'app-criar-pedido-compras',
  templateUrl: './criar-pedido-compras.component.html',
  styleUrls: ['./criar-pedido-compras.component.scss'],
})
export class CriarPedidoComprasComponent implements OnInit {
  public getDate: any = getDate;
  public fornecedores: any = [];
  public fornecedoresFiltrados: any = [];
  public produtosFiltrados: any = [];

  public fornecedorSelecionado: any = {
    id: null,
    fantasy_name: '',
    razao_social: '',
    cnpj: '',
    cep: '',
    endereco: '',
    complemento: '',
  };

  public pedido: any = {
    subtotal: '',
    desconto: '',
    frete: '',
    encargos: '',
    total: '',
  };
  public itensPedido: any = [];

  public produtos: any = [];

  constructor(
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.atualizarTotalPedido();
    this.getFornecedores();
    this.getProdutos();
  }

  setFornecedores(fornecedor: string) {
    const fornecedorSelecionado = this.fornecedores.find(
      (f: any) => f.fantasy_name == fornecedor
    );
    this.fornecedorSelecionado = fornecedorSelecionado;
  }

  getFornecedores() {
    this.fornecedorService.find().subscribe((res) => {
      this.fornecedorService.fornecedores = res;
      this.fornecedores = res;
      this.fornecedoresFiltrados = this.fornecedores;
    });
  }

  getProdutos() {
    this.produtoService.find().subscribe((res) => {
      this.produtoService.produtos = res;
      this.produtos = res;
      this.produtosFiltrados = this.produtos;
    });
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
      this.pedido.desconto -
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
