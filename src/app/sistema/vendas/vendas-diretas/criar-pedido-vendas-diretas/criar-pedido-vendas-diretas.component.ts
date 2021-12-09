import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { FilialService } from 'src/app/services/filial.service';
import { ItensPedidosService } from 'src/app/services/itens-pedidos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RhService } from 'src/app/services/rh.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import Swal from 'sweetalert2';
import { getDate } from '../../../../../environments/global';

@Component({
  selector: 'app-criar-pedido-vendas-diretas',
  templateUrl: './criar-pedido-vendas-diretas.component.html',
  styleUrls: ['./criar-pedido-vendas-diretas.component.scss'],
})
export class CriarPedidoVendasDiretasComponent implements OnInit {
  public motoristas: any[] = []
  public frete: number = 0
  public pedidoId: number = 0
  public valVenda: number = 0
  public valUnit: number = 0
  public clientes: any[] = []
  public originalClientes: any[] = []
  public enderecos: any[] = []
  public showSign: boolean
  public vendedores: any[] = []
  public filial: any [] = []
  public getDate: any = getDate;
  public allProdutosOriginal: any[] = []
  public allProdutos: any[] = []
  public pedidos: any[] = [];
  public itens: any[] = []
  public vendasDiretasForm: FormGroup = new FormGroup({
    "data": new FormControl(null, [Validators.required]), 
    "loja": new FormControl('', [Validators.required]), 
    "vendedor": new FormControl('', [Validators.required]), 
    "cnpj": new FormControl('', [Validators.required]), 
    "cliente": new FormControl('', [Validators.required]), 
    "condPagamento": new FormControl('', [Validators.required]), 
    "tabPreco": new FormControl(''), 
    "valorFreteEntrega": new FormControl(null), 
    "item": new FormArray([], [Validators.required]), 
    'produto': new FormArray([]),
    "cep": new FormControl('', [BrazilValidator.isValidCEP()]), 
    "endereco": new FormControl('', [Validators.required]), 
    "numero": new FormControl('', [Validators.required]), 
    "bairro": new FormControl('', [Validators.required]), 
    "cidade": new FormControl('', [Validators.required]), 
    "complemento": new FormControl(''), 
    "motorista": new FormControl('', [Validators.required]), 
    "placa": new FormControl('', [Validators.required]), 
    "previsaoEntrega": new FormControl(''),  
    "meioPagamento": new FormControl('', [Validators.required]), 
    "dataVencimento": new FormControl(null), 
    "aguradandoPagamento": new FormControl(''), 
    "linkBoleto": new FormControl(''),
    "linkNf": new FormControl(''),
    "obs": new FormControl(''),
    "tipoVenda": new FormControl(1),
    "total": new FormControl(0),
  })

  get item(){
    return this.vendasDiretasForm.get('item') as FormArray
  }

  get produto(){
    return this.vendasDiretasForm.get('produto') as FormArray
  }

  constructor(
    private readonly pedidosService: PedidosService,
    private readonly produtosService: ProdutoService,
    private readonly filialService: FilialService,
    private readonly rhService: RhService,
    private readonly clienteService: ClientService,
    private readonly router: Router,
    private readonly correiosService: CorreiosService
  ) {}

  ngOnInit(): void {
    this.clienteService.find().subscribe((data:any)=>{
      this.clientes = data
      this.originalClientes = data
    })
    this.rhService.find().subscribe((data:any)=>{
      for(let oneData of data){
        if(oneData.role.toLowerCase().substring(0,8)=="vendedor"){
          this.vendedores.push(oneData)
        }
        if(oneData.role.toLowerCase(0,9)=="motorista"){
          this.motoristas.push(oneData)
        }
      }
    })
    this.filialService.find().subscribe((data:any)=>{
      this.filial = data
    })
    this.produtosService.find().subscribe((data:any)=>{
      this.allProdutos = data
      this.allProdutosOriginal = data
      console.log(data)
    })
    for(let control in this.vendasDiretasForm['controls']){
      document.getElementById(control)?.addEventListener('click', ()=>{
        if(document.getElementById(control)?.classList.contains('invalid')){
          document.getElementById(control)?.classList.remove('invalid')
        }
      })
    }
  }

  // submit no vendasDiretasForm
  sendForm(data: any, data2: any): void{
    if(data.valid){
      console.log(data.value)
      this.totalValue(this.item.value)
      this.pedidosService.create(data.value).subscribe((data:any)=>{
          this.pedidoId = data.id
          for(let OnItem in this.item['value']){
            this.item['value'][OnItem].pedidoId = this.pedidoId
          }
          this.router.navigate(['sistema', 'vendas', 'vendas-diretas', 'listar'])
          Swal.fire({ 
            title: '<h4>Pedido adicionado !<h4>', 
            icon: 'success', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true,
            width: '500px'
          })
      })
    }else{
      for(let control in this.vendasDiretasForm['controls']){
        if(this.vendasDiretasForm['controls'][control].status === "INVALID"){
          console.log(control, this.item, data)
          document.getElementById(control)?.classList.add("invalid")
        }
      }
      Swal.fire({ 
        title: '<h4>Preencha os campos necessários!</h4>', 
        icon: 'error', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true,
        width: '500px'
      })
    }
  }

  totalQuanti(data: any): any{
    let total = 0
    for(let item of data){
      total += item.quantidade
    }
    return total
  }

  selectThisCliente(value: any){
    if(value.name!=null && value.surname!=null){
      this.vendasDiretasForm.get('cliente')?.setValue(`${value.name} ${value.surname}`)
      this.showSign = false
    }else{
      this.vendasDiretasForm.get('cliente')?.setValue(`${value.fantasyName}`)
      this.showSign = false
    }
  }

  filterBeforeCliente = "";
  filtrarCliente(event: any){
    this.showSign = true
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeCliente.length) {
        this.clientes = this.originalClientes.filter((user : any) => `${user.name} ${user.surname} ${user.fantasyName}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeCliente = str
      } else {
        this.clientes = this.originalClientes;
        this.clientes = this.originalClientes.filter((user : any) => `${user.name} ${user.surname} ${user.fantasyName}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeCliente = str
      }
      if(this.clientes.length == 0){
        this.showSign = false
      }
    } else {
      this.clientes = this.originalClientes;
      this.showSign = false
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

  totalProduto(value:any){
    value.total = (value.valorVenda*value.quantidade)+value.valorFrete
    this.totalValue(this.item.value)
  }

  totalFrete(value: number, value2: any = null){
    for(let item of this.item.value){
      item.valorFrete = value
    }
    this.totalProduto(value2)
    return value
  }

  totalValue(value: any){
    let total: number = 0
    for(let item of value){
      total += item.total
    }
    this.vendasDiretasForm.get('total')?.setValue(total)
    return total
  }

  check(data: number): any{
    let pos = this.item.value.map(
      (e: any)=>{return e.codigo}
    )
    if(pos.indexOf(data)!=-1){
      return true
    }
  }

  changeFrete(event: any){
   this.frete = Number(String(event.target.value).substring(3, String(event.target).length).replace(',', '.'))
  }


  checkIfChecked(event: any){
    console.log(this.allProdutos)
    let input = event.target
    let codigo = Number(event.target.value)
    if(input.checked){
      for(let produto of this.allProdutos){
        if(produto.id == codigo){
          this.item.push(new FormGroup({
            'codigo': new FormControl(produto.id),
            'produto': new FormControl(produto.nome),
            'quantidade': new FormControl(null, [Validators.required]),  
            'valorUnitario': new FormControl(produto.custoMedio),
            'desconto': new FormControl(null),
            'tipoRetirada': new FormControl(''),
            'prevRetirada': new FormControl(null),
            'valorFrete': new FormControl(null),
            'valorVenda': new FormControl(produto.precoMedio),
            'endereco': new FormControl(''),
            'enderecoLoja': new FormControl(''),
            'tipoEntrega': new FormControl(''),
            'total': new FormControl(0),
            'estoque': new FormControl(produto.atual)
          }))
          this.valVenda += produto.precoMedio
          this.valUnit += produto.custoMedio
        }
      }
      console.log(this.item)
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
          this.valVenda -= produto.precoMedio
          this.valUnit -= produto.custoMedio
        }
      }
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

  changeAddress(event: any) {
    let cep: string = event.target.value;
    cep = cep.replace('-', '');

    this.correiosService.consultaCep(cep).subscribe((data: any) => {
      if (data.cep) {
        this.vendasDiretasForm.get('endereco')?.setValue(data.logradouro)
        this.vendasDiretasForm.get('bairro')?.setValue(data.bairro)
        this.vendasDiretasForm.get('cidade')?.setValue(data.localidade)
      }
    })
  }

  cancelPedido(){

    Swal.fire({
      title: 'Você gostaria de cancelar este pedido ?',
      text: 'Ao cancelar este pedido, todos os dados digitados nesta tela serão descartados!',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['sistema', 'vendas', 'vendas-diretas', 'listar'])
        Swal.fire({ 
          title: '<h4>Pedido cancelado com sucesso!</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px'
        })
      } else if (result.isDenied) {
        Swal.fire({ 
          title: '<h4>O pedido não foi cancelado!</h4>', 
          icon: 'info', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true ,
          width: '500px'
        })
      }
    })
    
  }

  checkClient(event: any){
    let input = event.target.value
    for(let cliente of this.clientes){
      if(input == `${cliente.name} ${cliente.surname}`){
        this.selectThisCliente(cliente)
      }else if(input == `${cliente.fantasyName}`){
        this.selectThisCliente(cliente)
      }
    }
  }

  calcEstoque(data: any, event: any){
    let input = Number(event.target.value)
    if(Number(data.value.estoque)<input){
      data.controls.quantidade.setValue(null)
      Swal.fire({ 
        title: '<h4>Estoque insuficiente</h4>', 
        text: `A quantidade digitada passou da quantidade de estoque !`,
        icon: 'error',  
        showConfirmButton: true, 
        confirmButtonText: 'Comprar mais',
      }).then((result: any)=>{
        if(result.isConfirmed){
          this.router.navigate(['sistema', 'estoque'])
        }
      })
    }
  }
}
