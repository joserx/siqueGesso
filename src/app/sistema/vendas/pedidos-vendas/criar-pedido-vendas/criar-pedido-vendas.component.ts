import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { FilialService } from 'src/app/services/filial.service';
import { ItensPedidosService } from 'src/app/services/itens-pedidos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RhService } from 'src/app/services/rh.service';
import { StatusService } from 'src/app/services/status.service';
import Swal from 'sweetalert2';
import { getDate } from '../../../../../environments/global';

@Component({
  selector: 'app-criar-pedido-vendas',
  templateUrl: './criar-pedido-vendas.component.html',
  styleUrls: ['./criar-pedido-vendas.component.scss']
})
export class CriarPedidoVendasComponent implements OnInit {

  @ViewChild('content', {static: false})el: ElementRef
  public filial: any[] = []
  public enderecos: any[] = []
  public descontoG: number = 0
  public showSign: boolean
  public clientes: any[] = []
  public originalClientes: any[] = []
  public vendedores: any[] = []
  public user: any
  public valVenda: number = 0
  public valUnit: number = 0
  public dataId: number = 0
  public inputs: any = []
  public pedidoId: number
  public getDate: any = getDate;
  public desconto: number = 10;
  public passwordForm: FormGroup = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl('', [Validators.required])
  })
  public pedidosForm: FormGroup = new FormGroup({
    'data': new FormControl(null, [Validators.required]),
    'loja': new FormControl('', [Validators.required]),
    'vendedor': new FormControl('', [Validators.required]),
    'cliente': new FormControl('', [Validators.required]),
    'condPagamento': new FormControl('', [Validators.required]),
    'pagPersonalizado': new FormControl(''),
    'tabPreco': new FormControl(''),
    'tabPersonalizado': new FormControl(''),
    'produto': new FormArray([]),
    'item': new FormArray([], [Validators.required]),
    'descontoGeral': new FormControl(0),
    'meioPagamento': new FormControl('', [Validators.required]),
    'dias': new FormControl(''),
    'dataVencimento': new FormControl(null),
    'status': new FormControl(''),
    'linkBoleto': new FormControl(''),
    'linkNf': new FormControl(''),
    'obs': new FormControl(''),
    'total': new FormControl(''),
    'tipoVenda': new FormControl(0)
  })

  /* 
  
  adicionar o reconhecimento x
  mexer na coluna de total x
  mexer no total do listar (a fazer)
  adicionar tudo que eu adicionei no add pedido ao editar pedido

  */

  get item(){
    return this.pedidosForm.get('item') as FormArray
  }

  get produto(){
    return this.pedidosForm.get('produto') as FormArray
  }

  public status: any[] = []
  public allProdutos: any[] = []
  public allProdutosOriginal: any[] = []
  
  public resumo: any = { produtos: 2, unidades: 600, subtotal: 6000, descontos: 100, venda: 5900, frete: 300, total: 6200 };
  
  constructor(
    private readonly pedidoService: PedidosService,
    private readonly itensPedidoService: ItensPedidosService,
    private readonly statusService: StatusService,
    private readonly produtoService: ProdutoService,
    private readonly router: Router,
    private readonly authService: AuthenticationService,
    private readonly rhService: RhService,
    private readonly clienteService: ClientService,
    private readonly filialServices: FilialService
    ) { }
    
    ngOnInit(): void {
      this.filialServices.find().subscribe((data:any)=>{
        this.filial = data
      })
      this.clienteService.find().subscribe((data:any)=>{
        this.clientes = data
        this.originalClientes = data
        console.log('clintes', this.clientes)
      })
      this.rhService.find().subscribe((data: any)=>{
        for(let oneData of data){
          if(oneData.role.toLowerCase().substring(0,8)=='vendedor'){
            this.vendedores.push(oneData)
          }
        }
      })
      this.authService.currentUser.subscribe((user)=>{
        this.user = user.result 
        console.log(typeof(user.result))  
        this.passwordForm.get('email')?.setValue(user.result.email)
      })
      this.produtoService.find().subscribe((data: any)=>{
        this.allProdutos = data
        this.allProdutosOriginal = data
      })
      this.statusService.find().subscribe((data:any)=>{
        this.status = data
      })
      for(let control in this.pedidosForm['controls']){
        document.getElementById(control)?.addEventListener('click', ()=>{
          if(document.getElementById(control)?.classList.contains('invalid')){
            document.getElementById(control)?.classList.remove('invalid')
          }
        })
      }
    }
    
    submitForm(data:any, data2: any){
      data.value.data = new Date(data.value.data)
      let timezone = data.value.data.getTimezoneOffset() * 60000
      data.value.data = new Date(data.value.data + timezone).toISOString()
      if(data.valid){
        this.totalValue(this.item.value)
        data.value.status="Aguardando aprovação"
        this.pedidoService.create(data.value).subscribe((dt: any)=>{
          console.log(dt)
          this.pedidoId = data.id
          for(let OnItem in this.item['value']){
            this.item['value'][OnItem].pedidoId = this.pedidoId
          }
          this.router.navigate(['sistema', 'vendas', 'pedidos'])
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
        for(let control in this.pedidosForm['controls']){
          if(this.pedidosForm['controls'][control].status === "INVALID"){
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
    
    public log(x: any): void {
      console.log(x);
    }
    
    control(){
      this.dataId++
    }
  

  checkIfChecked(event: any){
    console.log(this.allProdutos)
    let input = event.target
    let codigo = Number(event.target.value)
    if(input.checked){
      for(let produto of this.allProdutos){
        if(produto.id == codigo){
          // this.produto.push(new FormGroup({
          //   'id': new FormControl(codigo)
          // }))
          this.item.push(new FormGroup({
            'codigo': new FormControl(produto.id),
            'produto': new FormControl(produto.nome),
            'quantidade': new FormControl(null, [Validators.required]),  
            'valorUnitario': new FormControl(produto.custoMedio),
            'desconto': new FormControl(0),
            'tipoRetirada': new FormControl(''),
            'prevRetirada': new FormControl(null),
            'valorFrete': new FormControl(0),
            'valorVenda': new FormControl(produto.precoMedio),
            'endereco': new FormControl(''),
            'enderecoLoja': new FormControl(''),
            'tipoEntrega': new FormControl('', [Validators.required]),
            'total': new FormControl(0)
          }))
          this.valUnit += produto.custoMedio
          this.valVenda += produto.precoMedio
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

  totalProduto(value:any){
    if(this.descontoG==0 || this.descontoG===null){   
      value.total = ((value.valorFrete + value.valorVenda)*value.quantidade)-value.desconto
    }else{
      value.total = ((value.valorFrete + value.valorVenda)*value.quantidade)
    }
  }
  totalValue(value: any){
    // console.log(value)
    let total: number = 0
    for(let item of value){
      total += item.total
    }
    console.log(total)
    this.item.value.total = total
    if(this.descontoG==0 || this.descontoG==null){
      this.pedidosForm.get('total')?.setValue(total)
      return total
    }else{
      this.pedidosForm.get('total')?.setValue(total - this.descontoG)
      return total - this.descontoG
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
      total += Number(item.desconto)
    }
    return total
  }

  setThisFrete(data: any, data2: any){
    data.valorFrete = Number(String(data2.target.value).substring(3,String(data2.target.value).length).replace(',','.'))
  }

  changeFrete(data: any){
    if(data.length==0){
      return 0
    }
    let total = 0
    for(let item of data){
      total += item.valorFrete
    }
    return total
  }

  savePdf(){
    // const doc = new jsPDF();
    // doc.text("Hello world!", 10, 10);
    // doc.save("relatorio-faltas.pdf");

    let pdf = new jsPDF("p", "pt", "a4")
    pdf.html(this.el.nativeElement, {
      callback: (pdf)=>{
        pdf.save("relatorio-pedidos-venda.pdf")
      }
    })
  }

  gerarPedido(data:any, allForm: any){
    // console.log(data.value.password)
    if(this.user.permission == 1){
      this.authService.checkPassword(data.value).subscribe((data:any)=>{
        if(data == true){
          Swal.fire({ 
            title: '<h4>Senha correta !</h4>', 
            icon: 'success', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true,
            width: '500px'
          })
          this.passwordForm.get('password')?.setValue('')
          if(allForm.valid){
            this.totalValue(this.item.value)
            allForm.value.status="Gerado"
            this.pedidoService.create(allForm.value).subscribe((data: any)=>{
              this.router.navigate(['sistema', 'vendas', 'pedidos'])
              Swal.fire({ 
                title: '<h4>Pedido gerado !</h4>', 
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
            Swal.fire({ 
              title: '<h4>Preencha todos os campos necessários !</h4>', 
              icon: 'error', 
              toast: true, 
              position: 'top', 
              showConfirmButton: false, 
              timer: 2000, 
              timerProgressBar: true,
              width: '500px'
            })
          }
        }else{
          Swal.fire({ 
            title: '<h4>Senha Incorreta!</h4>', 
            icon: 'error', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true,
            width: '500px'
          })
          this.passwordForm.get('password')?.setValue('')
        }
      })
    }else{
      Swal.fire({ 
        title: '<h4>Você não tem permissão para realizar esta ação !</h4>', 
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

  selectThisCliente(value: any){
    let addresses = []
    addresses = value.addresses
    console.log(addresses)
    if(value.name!=null && value.surname!=null){
      this.pedidosForm.get('cliente')?.setValue(`${value.name} ${value.surname}`)
      this.showSign = false
    }else{
      this.pedidosForm.get('cliente')?.setValue(`${value.fantasyName}`)
      this.showSign = false
    }
    this.enderecos = value.addresses
    console.log(this.enderecos)
  }

  descontoGeral(event:any){
    let total = Number(event.descontoGeral)
    for(let item of this.item.value){
      item.desconto = 0
    }
    for(let item of this.item['controls']){
      if(item.get('desconto')?.value!=null || item.get('desconto')?.value!=0){
        item.get('desconto')?.setValue(0)
      }
    }
    this.descontoG=total
    for(let item of this.item.value){
      this.totalProduto(item)
    }
  }

  cleanDesconto(){
    if(this.pedidosForm.get('descontoGeral')?.value!=null || this.pedidosForm.get('descontoGeral')?.value!=''){
      this.pedidosForm.get('descontoGeral')?.setValue('')
      this.descontoG = 0;
    }
  }

  // selectThisClienteBlur(value: string){
  //   let thisCliente: any[] = []
  //   for(let cliente of this.clientes){
  //     if(cliente.name!=null && cliente.surname!=null){
  //       thisCliente = cliente 
  //       this.showSign = false
  //     }else{
  //       thisCliente = cliente 
  //       this.showSign = false
  //     }
  //     this.enderecos = cliente.addresses
  //   }
  // }

}
