import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { FilialService } from 'src/app/services/filial.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { RhService } from 'src/app/services/rh.service';
import Swal from 'sweetalert2';
import { getDate } from '../../../../../environments/global';

@Component({
  selector: 'app-criar-pedido-vendas-diretas',
  templateUrl: './criar-pedido-vendas-diretas.component.html',
  styleUrls: ['./criar-pedido-vendas-diretas.component.scss'],
})
export class CriarPedidoVendasDiretasComponent implements OnInit {
  public frete: number = 0
  // public freteTotal: number = (this.frete / this.item.length)*this.item.length
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
    "valorFreteEntrega": new FormControl(''), 
    "item": new FormArray([], [Validators.required]), 
    'produto': new FormArray([]),
    "cep": new FormControl('', [Validators.required]), 
    "endereço": new FormControl('', [Validators.required]), 
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
    "obs": new FormControl('')
  })

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
    private readonly clienteService: ClientService
  ) {}

  ngOnInit(): void {
    this.atualizarTotalPedido();
    this.clienteService.find().subscribe((data:any)=>{
      this.clientes = data
      this.originalClientes = data
    })
    this.rhService.find().subscribe((data:any)=>{
      for(let oneData of data){
        if(oneData.role.toLowerCase().substring(0,8)=="vendedor"){
          this.vendedores.push(oneData)
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
  sendForm(data: any): void{
    if(data.valid){

    }else{
      for(let control in this.vendasDiretasForm['controls']){
        if(this.vendasDiretasForm['controls'][control].status === "INVALID"){
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
    value.total = (value.valorFrete + value.valorVenda)*value.quantidade
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

  // mexendo no frete
  // calcular o frete que é o fretefixo / pelo valor unitário * a quantidade
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
          // this.produto.push(new FormGroup({
          //   'id': new FormControl(codigo)
          // }))
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
            'tipoEntrega': new FormControl('', [Validators.required]),
            'total': new FormControl(null)
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
    // this.vendedores.forEach((fornecedor: any) => {
    //   if (this.vendedores.id == id) {
    //     this.fornecedorSelecionado = this.vendedores;
    //   }
    // });
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
