import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { AuthenticationService } from 'src/app/services/auth.service';
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

  @ViewChild('content', {static: false})el: ElementRef
  public user: any
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
    'descontoGeral': new FormControl(null),
    'tipoEntrega': new FormControl('', [Validators.required]),
    'enderecoEntrega': new FormControl('', [Validators.required]),
    'valorFreteEntrega': new FormControl(''),
    'meioPagamento': new FormControl('', [Validators.required]),
    'dias': new FormControl(''),
    'dataVencimento': new FormControl(null),
    'status': new FormControl('', [Validators.required]),
    'linkBoleto': new FormControl(''),
    'linkNf': new FormControl(''),
    'obs': new FormControl(''),
    'total': new FormControl(''),
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
    private readonly produtoService: ProdutoService,
    private readonly router: Router,
    private readonly authService: AuthenticationService,
    ) { }
    
    ngOnInit(): void {
      this.authService.currentUser.subscribe((user)=>{
        this.user = user.result 
        console.log(typeof(user.result))  
        this.passwordForm.get('email')?.setValue(user.result.email)
      })
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
      if(data.valid){
        data.value.total = (((this.totalQuanti(this.item.value)*this.valUnit) - this.changeDesconto(this.item.value)) + this.changeFrete(this.item.value))
        data.value.status="Aguardando aprovação"
        this.pedidoService.create(data.value).subscribe((dt: any)=>{
          console.log(dt)
          this.pedidoId = data.id
          for(let OnItem in this.item['value']){
            this.item['value'][OnItem].pedidoId = this.pedidoId
          }
          this.itensPedidoService.create(data2.value).subscribe((data:any)=>{})
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
  
  /* 
  { codigo: 1, produto: 'Drywall', quantidade: 50, valor_unitario: 25.90, desconto_tab: 5, desconto_ad: 0, valor_venda: 20.90 },
  { codigo: 2, produto: 'Gesso', quantidade: 4, valor_unitario: 16.90, desconto_tab: 0, desconto_ad: 0, valor_venda: 16.90 },
  */
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
            allForm.value.total = (((this.totalQuanti(this.item.value)*this.valUnit) - this.changeDesconto(this.item.value)) + this.changeFrete(this.item.value))
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

}
