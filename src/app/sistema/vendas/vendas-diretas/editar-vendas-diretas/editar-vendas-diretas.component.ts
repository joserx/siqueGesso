import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { getDate } from '../../../../../environments/global';
import Swal from 'sweetalert2';
import { FilialService } from 'src/app/services/filial.service';
import { RhService } from 'src/app/services/rh.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { ClientService } from 'src/app/services/client.service';
import { CorreiosService } from 'src/app/services/correios.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { CondicoesPagamentoService } from 'src/app/services/condicoes-pagamento.service';

@Component({
  selector: 'app-editar-vendas-diretas',
  templateUrl: './editar-vendas-diretas.component.html',
  styleUrls: ['./editar-vendas-diretas.component.scss']
})
export class EditarVendasDiretasComponent implements OnInit {


  /* 
  
  ver o bug de checar a quantidade de produto no estoque feito
  ver o esquema de subtrair o estoque
  
  */

  public dados: any[] = []
  public currentItem: any[] = []
  public motoristas: any[] = []
  public id: number
  public getDate: any = getDate;
  public filial: any [] = []
  public condPagamento: any [] = []
  public vendedores: any[] = []
  public allProdutosOriginal: any[] = []
  public allProdutos: any[] = []
  public showSign: boolean
  public clientes: any[] = []
  public originalClientes: any[] = []
  public frete: number = 0
  public valVenda: number = 0
  public valUnit: number = 0
  public vendasDiretasForm: FormGroup = new FormGroup({
    "data": new FormControl(null, [Validators.required]),
    "loja": new FormControl('', [Validators.required]),
    "vendedor": new FormControl('', [Validators.required]),
    "cnpj": new FormControl('', [Validators.required]),
    "cliente": new FormControl('', [Validators.required]),
    "condPagamento": new FormControl('', [Validators.required]),
    "tabPreco": new FormControl(''),
    "valorFreteEntrega": new FormControl(0),
    "item": new FormArray([], [Validators.required]), // a fazer
    'produto': new FormArray([]),
    "cep": new FormControl('', [BrazilValidator.isValidCEP()]),
    "endereco": new FormControl('', [Validators.required]),
    "numero": new FormControl('', [Validators.required]),
    "bairro": new FormControl('', [Validators.required]),
    "cidade": new FormControl('', [Validators.required]),
    "complemento": new FormControl(''),
    "motorista": new FormControl('', [Validators.required]),
    "placa": new FormControl('', [Validators.required]),
    "previsaoEntrega": new FormControl(null, Validators.required),  
    "meioPagamento": new FormControl('', [Validators.required]), 
    "dataVencimento": new FormControl(null, [Validators.required]), 
    "aguradandoPagamento": new FormControl(''),
    "linkBoleto": new FormControl(''),
    "linkNf": new FormControl(''),
    "obs": new FormControl(''),
    "tipoVenda": new FormControl(1),
    "total": new FormControl(0),
    "clienteId": new FormControl(null)
  })
  create: boolean = false
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly pedidosService: PedidosService,
    private readonly filialService: FilialService,
    private readonly rhService: RhService,
    private readonly produtosService: ProdutoService,
    private readonly clienteService: ClientService,
    private readonly correiosService: CorreiosService,
    private readonly condicaoPagamentoService: CondicoesPagamentoService
  ) { }

  ngOnInit(): void {
    this.findCondPagamento()
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_editar) == PermissionsUsers.vendas_editar)){
      this.router.navigate(['sistema'])
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_editar) == PermissionsUsers.vendas_editar){
      this.create = true
    }
    const routerParams = this.route.snapshot.paramMap
    this.id = Number(routerParams.get('id'))
    this.filialService.find().subscribe((data:any)=>{
      this.filial = data
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
    this.produtosService.find().subscribe((data:any)=>{
      this.allProdutos = data
      this.allProdutosOriginal = data
      console.log(data)
    })
    this.clienteService.find().subscribe((data:any)=>{
      this.clientes = data
      this.originalClientes = data
    })
    this.pedidosService.findOne(this.id).subscribe((data: any)=>{
      this.dados = data.item
      this.vendasDiretasForm.get("data")?.setValue(data.data==null? null:data.data.substring(0,10))
      this.vendasDiretasForm.get("loja")?.setValue(data.loja)
      this.vendasDiretasForm.get("vendedor")?.setValue(data.vendedor)
      this.vendasDiretasForm.get("cnpj")?.setValue(data.cnpj)
      this.vendasDiretasForm.get("cliente")?.setValue(data.cliente)
      this.vendasDiretasForm.get("condPagamento")?.setValue(data.condPagamento)
      this.vendasDiretasForm.get("tabPreco")?.setValue(data.tabPreco)
      this.vendasDiretasForm.get("valorFreteEntrega")?.setValue(data.valorFreteEntrega)
      this.vendasDiretasForm.get("cep")?.setValue(data.cep)
      this.vendasDiretasForm.get("endereco")?.setValue(data.endereco)
      this.vendasDiretasForm.get("numero")?.setValue(data.numero)
      this.vendasDiretasForm.get("bairro")?.setValue(data.bairro)
      this.vendasDiretasForm.get("cidade")?.setValue(data.cidade)
      this.vendasDiretasForm.get("complemento")?.setValue(data.complemento)
      this.vendasDiretasForm.get("motorista")?.setValue(data.motorista)
      this.vendasDiretasForm.get("placa")?.setValue(data.placa)
      this.vendasDiretasForm.get("previsaoEntrega")?.setValue(data.previsaoEntrega==null? null:data.previsaoEntrega.substring(0,10))
      this.vendasDiretasForm.get("meioPagamento")?.setValue(data.meioPagamento)
      this.vendasDiretasForm.get("dataVencimento")?.setValue(data.dataVencimento==null? null:data.dataVencimento.substring(0,10))
      this.vendasDiretasForm.get("aguradandoPagamento")?.setValue(data.aguradandoPagamento)
      this.vendasDiretasForm.get("linkBoleto")?.setValue(data.linkBoleto)
      this.vendasDiretasForm.get("linkNf")?.setValue(data.linkNf)
      this.vendasDiretasForm.get("obs")?.setValue(data.obs)
      this.vendasDiretasForm.get("clienteId")?.setValue(data.clienteId)
      for(let item of data.item){
        console.log(item)
        this.item.push(new FormGroup({
          'id': new FormControl(item.id),
          'codigo': new FormControl(item.codigo),
          'produto': new FormControl(item.produto),
          'quantidade': new FormControl(item.quantidade, [Validators.required]),  
          'valorUnitario': new FormControl(Number(item.valorUnitario)),
          'desconto': new FormControl(Number(item.desconto)),
          'tipoRetirada': new FormControl(item.tipoRetirada),
          'prevRetirada': new FormControl(item.prevRetirada==!null? item.prevRetirada.substring(10,0):null),
          'valorFrete': new FormControl(Number(item.valorFrete)),
          'valorVenda': new FormControl(Number(item.valorVenda)),
          'endereco': new FormControl(item.endereco),
          'enderecoLoja': new FormControl(item.enderecoLoja),
          'tipoEntrega': new FormControl(item.tipoEntrega),
          'total': new FormControl(item.total),
          'estoque': new FormControl(item.estoque)
        }))
        this.valUnit += item.valorUnitario
        this.valVenda += item.valorVenda
      }
    })
    for(let control in this.vendasDiretasForm['controls']){
      document.getElementById(control)?.addEventListener('click', ()=>{
        if(document.getElementById(control)?.classList.contains('invalid')){
          document.getElementById(control)?.classList.remove('invalid')
        }
      })
    }
  }

  get item(){
    return this.vendasDiretasForm.get('item') as FormArray
  }

  get produto(){
    return this.vendasDiretasForm.get('produto') as FormArray
  }

  // submit no vendasDiretasForm
  sendForm(data: any, data2: any): void{
    if(data.valid){
      // Atualizar número de estoque
        this.totalValue(this.item.value)
        this.pedidosService.update(this.id ,data.value).subscribe((data:any)=>{
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

  totalValue(value: any){
    let total: number = 0
    for(let item of value){
      total += item.total
    }
    this.vendasDiretasForm.get('total')?.setValue(total)
    return total
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

  selectThisCliente(value: any){
    if(value.name!=null && value.surname!=null){
      this.vendasDiretasForm.get('cliente')?.setValue(`${value.name} ${value.surname}`)
      this.vendasDiretasForm.get('clienteId')?.setValue(value.id)
      this.showSign = false
    }else{
      this.vendasDiretasForm.get('cliente')?.setValue(`${value.fantasyName}`)
      this.vendasDiretasForm.get('clienteId')?.setValue(value.id)
      this.showSign = false
    }
  }

  changeFrete(event: any){
    this.frete = Number(String(event.target.value).substring(3, String(event.target).length).replace(',', '.'))
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

  totalQuanti(data: any): any{
    let total = 0
    for(let item of data){
      total += item.quantidade
    }
    return total
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
          console.log(this.item.value)
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

  check(data: number): any{
    let pos = this.item.value.map(
      (e: any)=>{return e.codigo}
    )
    if(pos.indexOf(data)!=-1){
      return true
    }
  }

  cancelPedido(){

    Swal.fire({
      title: 'Você gostaria de cancelar este pedido ?',
      text: 'Ao cancelar este pedido, ele será excluido também!',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.pedidosService.delete(this.id).subscribe((data:any)=>{
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
    console.log(data)
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

  findCondPagamento() {

    this.condicaoPagamentoService.findAll().subscribe((resp) => {
      this.condPagamento = resp
    })
    console.log("this.condPagamento", this.condPagamento );
  }

}
