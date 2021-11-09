import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItensPedidosService } from 'src/app/services/itens-pedidos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { StatusService } from 'src/app/services/status.service';
import Swal from 'sweetalert2';
import { getDate } from '../../../../../environments/global';

@Component({
  selector: 'app-criar-pedido-vendas',
  templateUrl: './criar-pedido-vendas.component.html',
  styleUrls: ['./criar-pedido-vendas.component.scss']
})
export class CriarPedidoVendasComponent implements OnInit {

  public valUnit: number = 0
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
    'produto': new FormArray([]),
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

  get produto(){
    return this.pedidosForm.get('produto') as FormArray
  }

  public status: any[] = []
  public allProdutos: any[] = []
  public allProdutosOriginal: any[] = []
  
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
    private readonly itensPedidoService: ItensPedidosService,
    private readonly statusService: StatusService,
    private readonly produtoService: ProdutoService
    ) { }
    
    ngOnInit(): void {
      this.produtoService.find().subscribe((data: any)=>{
        this.allProdutos = data
        this.allProdutosOriginal = data
        for(let unit of data){
          this.valUnit += unit.atual
        }
      })
      this.statusService.find().subscribe((data:any)=>{
        this.status = data
      })
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
    
    public log(x: any): void {
      console.log(x);
    }
    
    control(){
      this.dataId++
    }
  
  /* 
  { codigo: 1, produto: 'Drywall', quantidade: 50, valor_unitario: 25.90, desconto_tab: 5, desconto_ad: 0, valor_venda: 20.90 },
       { codigo: 2, produto: 'Gesso', quantidade: 4, valor_unitario: 16.90, desconto_tab: 0, desconto_ad: 0, valor_venda: 16.90 },
  */
  checkIfChecked(event: any){
    let input = event.target
    let codigo = Number(event.target.value)
    if(input.checked){
      for(let produto of this.allProdutos){
        if(produto.id == codigo){
          this.produto.push(new FormGroup({
            'id': new FormControl(codigo)
          }))
          this.item.push(new FormGroup({
            'pedidoId': new FormControl(null),
            'codigo': new FormControl(produto.id),
            'produto': new FormControl(produto.nome),
            'quantidade': new FormControl(null, [Validators.required]),  
            'valorUnitario': new FormControl(produto.atual),
            'desconto': new FormControl(null),
            'tipoRetirada': new FormControl('', [Validators.required]),
            'prevRetirada': new FormControl(null, [Validators.required]),
            'valorFrete': new FormControl(null),
            'valorVenda': new FormControl(produto.precoMedio),
            'endereco': new FormControl('', [Validators.required]),
          }))
        }
      }
    }else{
      for(let produto of this.allProdutos){
        if(produto.id == codigo){
          this.produto.controls.splice(
            this.produto.controls.map(function(e: any){
              return e.id
            }).indexOf(codigo), 1
          )
          this.produto.value.splice(
            this.produto.value.map(function(e: any){
              return e.id
            }).indexOf(codigo), 1
          )
          this.item.controls.splice(this.item.controls.map(
            function(e: any) {
              return e.value.codigo
            }).indexOf(codigo), 1
          )
          this.item.value.splice( 
            this.item.value.map(function(e: any) {
              return e.codigo
            }).indexOf(codigo), 1
          )
        }
      }
      console.log(this.item)
    }
  }

  checkProdutos(event: any){
    if(this.produto.length==0){
      Swal.fire({ 
        title: 'Adicione produtos !', 
        icon: 'error', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true
      })
    }
  }

  filterBefore = "";
  filtrar(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.allProdutos = this.allProdutosOriginal.filter((user : any) => `${user.id} ${user.nome} ${user.atual} ${user.custoMedio} ${user.precoMedio} ${user.margemLucro}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.allProdutos = this.allProdutosOriginal;
        this.allProdutos = this.allProdutosOriginal.filter((user : any) => `${user.id} ${user.nome} ${user.atual} ${user.custoMedio} ${user.precoMedio} ${user.margemLucro}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.allProdutos = this.allProdutosOriginal;
    }
  }

  check(data: number): any{
    let pos = this.item.value.map(
      (e: any)=>{return e.codigo}
    )
    if(pos.indexOf(data)!=-1){
      return true
    }
  }

  totalQuanti(data: any): any{
    let total = 0
    for(let item of data){
      total += item.quantidade
    }
    return total
  }

  changeDesconto(data: any): any{
    let total = 0
    for(let item of data){
      total += item.desconto
    }
    return total
  }

  changeFrete(data: any){
    let total = 0
    for(let item of data){
      total += item.valorFrete
    }
    return total
  }
}
