import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { getDate } from '../../../../../environments/global';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedorService } from 'src/app/services/fornecedores.service';
import { ProdutoService } from '../../../../services/produto.service';
import { PedidoCompraService } from 'src/app/services/pedido-compra.service';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-criar-pedido-compras',
  templateUrl: './criar-pedido-compras.component.html',
  styleUrls: ['./criar-pedido-compras.component.scss'],
})
export class CriarPedidoComprasComponent implements OnInit {
  pedidoCompraForm = new FormGroup({
    id: new FormControl(''),
    data: new FormControl(''),
    faturamentoMinimo: new FormControl(''),
    fornecedor: new FormControl(''),
    razaoSocial: new FormControl(''),
    cnpj: new FormControl(''),
    cep: new FormControl(''),
    endereco: new FormControl(''),
    complemento: new FormControl(''),
    itensProduto: new FormArray([]),
    subtotal: new FormControl(''),
    desconto: new FormControl(''),
    frete: new FormControl(''),
    encargos: new FormControl(''),
    valorTotal: new FormControl(''),
    condPagamento: new FormControl(''),
    dataVenc: new FormControl(''),
    meioPag: new FormControl(''),
    status: new FormControl(''),
    obs: new FormControl(''),
  });
  public get itens(): any {
    return this.pedidoCompraForm.get('itensProduto') as FormArray;
  }

  @Output() reload = new EventEmitter();
  @ViewChild('close') closeBtn: any;

  public getDate: any = getDate;
  public fornecedores: any = [];
  public fornecedoresFiltrados: any = [];
  public produtosFiltrados: any = [];

  public comprasRealizadas: number = 15;

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

  lineChartData: Chart.ChartDataSets[] = [
    {
      label: 'Lorem Ipsum',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [this.comprasRealizadas],
    },
  ];
  lineChartLabels: Array<any> = ['Compras nos ultimos 3 meses'];
  lineChartOptions: any = {
    responsive: true,
  };
  lineChartLegend = true;
  lineChartType: any = 'pie';
  inlinePlugin: any;
  textPlugin: any;

  constructor(
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService,
    private pedidoCompraService: PedidoCompraService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.compras_editar) == PermissionsUsers.compras_editar)){
      this.router.navigate(['sistema'])
    }
    this.atualizarTotalPedido();
    this.getFornecedores();
    this.getProdutos();
  }

  initDataTable() {}

  setFornecedores(fornecedor: string) {
    const fornecedorSelecionado = this.fornecedores.find(
      (f: any) => f.fantasy_name == fornecedor
    );
    this.fornecedorSelecionado = fornecedorSelecionado;
    this.pedidoCompraForm.patchValue({
      razaoSocial: fornecedorSelecionado.fantasy_name,
      cnpj: fornecedorSelecionado?.cnpj,
      cep: fornecedorSelecionado?.address?.cep,
      endereco: fornecedorSelecionado?.address?.street,
      complemento: fornecedorSelecionado?.address?.complement,
    });
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

    this.itens.push(
      new FormGroup({
        codigo: new FormControl(this.itens.value.length + 1),
        produto: new FormControl(''),
        quantidade: new FormControl(null),
        valorUn: new FormControl(null),
        subtotal: new FormControl(null),
      })
    );
  }

  public removerItemPedido(itemId: any): void {
    this.itens.removeAt(itemId);
  }

  public atualizarTotalPedido(): void {
    let oneItem = 0;
    for (let item of this.itens.value) {
      oneItem =
        Number(String(item.subtotal)) -
        Number(String(this.pedidoCompraForm.get('desconto')?.value)) +
        Number(String(this.pedidoCompraForm.get('frete')?.value)) +
        Number(String(this.pedidoCompraForm.get('encargos')?.value));
    }

    this.pedidoCompraForm.controls['valorTotal'].setValue(oneItem);
  }

  aplicarDesconto(desconto: string) {
    let discount = Number(desconto);
    this.pedido.desconto = discount;
    this.atualizarTotalPedido();
  }

  aplicarFrete(frete: string) {
    let freight = Number(frete);
    this.pedido.frete = freight;
    this.atualizarTotalPedido();
  }

  aplicarEncargo(encargo: string) {
    let charge = Number(encargo);
    this.pedido.encargos = charge;
    this.atualizarTotalPedido();
  }

  public atualizarSubtotalProduto(qtd: any, codigo: any) {
    // Atualizando o item
    this.itens.value.map((itemPedido: any, i: any) => {
      if (itemPedido == codigo) {
        this.itens.value[i].quantidade = parseInt(qtd.value);
        this.itens.value[i].subtotal =
          this.itens.value[i].quantidade * this.itens.value[i].valorUn;
      }
    });
    let subtotal = 0;
    for (let iten of this.itens.value) {
      iten.subtotal += iten.quantidade * iten.valorUn;
    }

    // Atualizando o subtotal do pedido

    this.atualizarTotalPedido();
  }

  //insere o valor unitário no objeto
  insereValorNoObj(valor: any, codigo: any) {
    let valorRecebido = String(valor.target.value).substring(2);
    this.itens.value.map((itemPedido: any, i: any) => {
      if (itemPedido.codigo == codigo) {
        this.itens.value[i].valorUn = parseInt(valorRecebido);
      }
    });
  }
  somaSub(): number {
    let total: number = 0;
    for (let item of this.itens.value) {
      total += item.subtotal;
    }

    return total;
  }

  cancelar() {
    Swal.fire({
      title: 'Confirma o cancelamento?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['sistema', 'compras', 'pedidos']);
        Swal.fire({
          title: '<h4>Pedido cancelado com sucesso!</h4>',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          width: '500px',
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: '<h4>Pedido não cancelado!</h4>',
          icon: 'info',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          width: '500px',
        });
      }
    });
  }

  submit(): any {
    const { faturamentoMinimo } = this.pedidoCompraForm.value;
    this.pedidoCompraForm.patchValue({
      faturamentoMinimo: faturamentoMinimo.replace(/\D+/g, ''),
    });

    if (this.pedidoCompraForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos corretamente!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    this.pedidoCompraService
      .create(this.pedidoCompraForm.value)
      .subscribe(() => {
        this.reload.emit();
        // this.closeBtn.nativeElement.click();
        this.pedidoCompraForm.reset();
        return Swal.fire({
          title: 'Pedido salvo!',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  }
}
