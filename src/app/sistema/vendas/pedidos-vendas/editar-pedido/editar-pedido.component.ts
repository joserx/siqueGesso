import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { FilialService } from 'src/app/services/filial.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RhService } from 'src/app/services/rh.service';
import { StatusService } from 'src/app/services/status.service';
import { getDate } from 'src/environments/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss']
})
export class EditarPedidoComponent implements OnInit {

  @ViewChild('content', {static: false})el: ElementRef
  public filial: any[] = []
  public enderecos: any[] = []
  public descontoG: any
  public showSign: boolean
  public clientes: any[] = []
  public originalClientes: any[] = []
  public vendedores: any[] = []
  public id: number
  public user: any
  public pedido: any[] = []
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
    'meioPagamento': new FormControl('', [Validators.required]),
    'dias': new FormControl(''),
    'dataVencimento': new FormControl(null),
    'status': new FormControl('', [Validators.required]),
    'linkBoleto': new FormControl(''),
    'linkNf': new FormControl(''),
    'obs': new FormControl(''),
    'total': new FormControl(''),
    'tipoVenda': new FormControl(0)
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
  
  
  public resumo: any = { produtos: 2, unidades: 600, subtotal: 6000, descontos: 100, venda: 5900, frete: 300, total: 6200 };
  
  constructor(
    private readonly pedidoService: PedidosService,
    private readonly statusService: StatusService,
    private readonly produtoService: ProdutoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthenticationService,
    private readonly rhService: RhService,
    private readonly clienteService: ClientService,
    private readonly filialService: FilialService
    ) { }
    
    ngOnInit(): void {
      this.filialService.find().subscribe((data: any)=>{
        this.filial = data
        console.log(data)
      })
      this.clienteService.find().subscribe((data:any)=>{
        this.clientes = data
        this.originalClientes = data
        // console.log('clintes', this.clientes)
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
      const routerParams = this.route.snapshot.paramMap
      this.id = Number(routerParams.get('id'))
      this.pedidoService.findOne(this.id).subscribe((data: any)=>{
        this.pedido = data
        this.pedidosForm.get('data')?.setValue(data.data.substring(10,0))
        this.pedidosForm.get('loja')?.setValue(data.loja)
        this.pedidosForm.get('vendedor')?.setValue(data.vendedor)
        this.pedidosForm.get('cliente')?.setValue(data.cliente)
        this.pedidosForm.get('condPagamento')?.setValue(data.condPagamento)
        this.pedidosForm.get('pagPersonalizado')?.setValue(data.pagPersonalizado)
        this.pedidosForm.get('tabPreco')?.setValue(data.tabPreco)
        this.pedidosForm.get('tabPersonalizado')?.setValue(data.tabPersonalizado)
        this.pedidosForm.get('descontoGeral')?.setValue(data.descontoGeral)
        this.pedidosForm.get('enderecoEntrega')?.setValue(data.enderecoEntrega)
        this.pedidosForm.get('valorFreteEntrega')?.setValue(data.valorFreteEntrega)
        this.pedidosForm.get('meioPagamento')?.setValue(data.meioPagamento)
        this.pedidosForm.get('dias')?.setValue(data.dias)
        this.pedidosForm.get('dataVencimento')?.setValue(data.dataVencimento.substring(10,0))
        this.pedidosForm.get('status')?.setValue(data.status)
        this.pedidosForm.get('linkBoleto')?.setValue(data.linkBoleto)
        this.pedidosForm.get('linkNf')?.setValue(data.linkNf)
        this.pedidosForm.get('obs')?.setValue(data.obs)
        this.pedidosForm.get('total')?.setValue(data.total)
        console.log(data)
        for(let item in data.item){
          this.item.push(new FormGroup({
            'pedidoId': new FormControl(data.item[item].id),
            'codigo': new FormControl(data.item[item].codigo),
            'produto': new FormControl(data.item[item].produto),
            'quantidade': new FormControl(data.item[item].quantidade, [Validators.required]),  
            'valorUnitario': new FormControl(Number(data.item[item].valorUnitario)),
            'desconto': new FormControl(Number(data.item[item].desconto)),
            'tipoRetirada': new FormControl(data.item[item].tipoRetirada),
            'prevRetirada': new FormControl(data.item[item].prevRetirada.substring(10,0)),
            'valorFrete': new FormControl(Number(data.item[item].valorFrete)),
            'valorVenda': new FormControl(Number(data.item[item].valorVenda)),
            'endereco': new FormControl(data.item[item].endereco),
            'enderecoLoja': new FormControl(data.item[item].enderecoLoja),
            'tipoEntrega': new FormControl(data.item[item].tipoEntrega, [Validators.required]),
          }))
        }
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
      console.log(data)

      if(data.valid){
        data.value.total = (((this.totalQuanti(this.item.value)*this.valUnit) - this.changeDesconto(this.item.value)) + this.changeFrete(this.item.value))
        if(data.value.status != "Gerado"){
          data.value.status="Aguardando aprovação"
        }
        this.pedidoService.update(this.id, data.value).subscribe((dt: any)=>{
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
            'tipoRetirada': new FormControl(''),
            'prevRetirada': new FormControl(null),
            'valorFrete': new FormControl(null),
            'valorVenda': new FormControl(produto.precoMedio),
            'endereco': new FormControl(''),
            'enderecoLoja': new FormControl(''),
            'tipoEntrega': new FormControl('', [Validators.required]),
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
      total += Number(item.desconto)
    }
    return total
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
            allForm.value.total = (((this.totalQuanti(this.item.value)*this.valUnit) - this.changeDesconto(this.item.value)) + this.changeFrete(this.item.value))
            allForm.value.status="Gerado"
            this.pedidoService.update(this.id, allForm.value).subscribe((data: any)=>{
              this.router.navigate(['sistema', 'vendas', 'pedidos'])
              Swal.fire({ 
                title: '<h4>Pedido gerado</h4>', 
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

 cancelarPedido(id: number){
  Swal.fire({
    title: 'Você gostaria de cancelar este pedido?',
    text: 'Ao cancelar este pedido, ele será deletado !',
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: 'Sim',
    denyButtonText: `Não`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.pedidoService.delete(id).subscribe((data:any)=>{
        this.router.navigate(['sistema', 'vendas', 'pedidos'])
        Swal.fire({ 
          title: '<h4>Pedido Cancelado !</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true ,
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
      item.desconto = null
    }
    for(let item of this.item['controls']){
      if(item.get('desconto')?.value!=null || item.get('desconto')?.value!=0){
        item.get('desconto')?.setValue('')
      }
    }
    this.descontoG=total
  }

  cleanDesconto(){
    if(this.pedidosForm.get('descontoGeral')?.value!=null || this.pedidosForm.get('descontoGeral')?.value!=''){
      this.pedidosForm.get('descontoGeral')?.setValue('')
      this.descontoG = null;
    }
  }

}
