import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ItensPedidosService } from 'src/app/services/itens-pedidos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { getDate } from '../../../../../environments/global';

@Component({
  selector: 'app-criar-pedido-vendas',
  templateUrl: './criar-pedido-vendas.component.html',
  styleUrls: ['./criar-pedido-vendas.component.scss']
})
export class CriarPedidoVendasComponent implements OnInit {

  public dataId: number = 0
  public inputs: any = []
  public pedidoId: number
  public getDate: any = getDate;
  public desconto: number = 10;
  public pedidosForm: FormGroup = new FormGroup({
    'data': new FormControl(null),
    'loja': new FormControl(''),
    'vendedor': new FormControl(''),
    'cliente': new FormControl(''),
    'condPagamento': new FormControl(''),
    'pagPersonalizado': new FormControl(''),
    'tabPreco': new FormControl(''),
    'tabPersonalizado': new FormControl(''),
    'descontoMax': new FormControl(''),
    'item': new FormArray([]),
    'descontoGeral': new FormControl(''),
    'tipoEntrega': new FormControl(''),
    'enderecoEntrega': new FormControl(''),
    'valorFreteEntrega': new FormControl(''),
    'meioPagamento': new FormControl(''),
    'dias': new FormControl(''),
    'dataVencimento': new FormControl(null),
    'status': new FormControl(''),
    'linkBoleto': new FormControl(''),
    'linkNf': new FormControl(''),
    'obs': new FormControl('')
  })

  get item(){
    return this.pedidosForm.get('item') as FormArray
  }

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

  constructor(
    private readonly pedidoService: PedidosService,
    private readonly itensPedidoService: ItensPedidosService
  ) { }

  ngOnInit(): void {
    for(let item of this.itens){
      this.item.push(new FormGroup({
        'pedidoId': new FormControl(null),
        'quantidade': new FormControl(null),  
        'desconto': new FormControl(''),
        'tipoRetirada': new FormControl(''),
        'prevRetirada': new FormControl(null),
        'valorFrete': new FormControl(''),
        'endereco': new FormControl(''),
      }))
    }
  }
  
  submitForm(data:any, data2: any){
    this.pedidoService.create(data.value).subscribe((data: any)=>{
      this.pedidoId = data.id
      for(let OnItem in this.item['value']){
        this.item['value'][OnItem].pedidoId = this.pedidoId
      }
      this.itensPedidoService.create(data2.value).subscribe((data:any)=>{
        alert('teste')
      })
    })
  }

  evento(event: any){
    console.log(event.target.value)
    if(this.inputs.indexOf(event.target) == -1){
      this.inputs.push(event.target)
    }
    console.log(this.inputs[0].value)
  }

  public log(x: any): void {
    console.log(x);
  }

  control(){
   this.dataId++
  }

}
