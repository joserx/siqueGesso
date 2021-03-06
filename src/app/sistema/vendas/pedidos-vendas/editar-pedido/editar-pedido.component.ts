import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { CondicoesPagamentoService } from 'src/app/services/condicoes-pagamento.service';
import { FilialService } from 'src/app/services/filial.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { ProdutoService } from 'src/app/services/produto.service';
import { RhService } from 'src/app/services/rh.service';
import { StatusService } from 'src/app/services/status.service';
import { getDate } from 'src/environments/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss'],
})
export class EditarPedidoComponent implements OnInit {
  @ViewChild('content', { static: false }) el: ElementRef;
  public tipoEntregaVar: string;
  public filial: any[] = [];
  public enderecos: any[] = [];
  public descontoG: number = 0;
  public showSign: boolean;
  public clientes: any[] = [];
  public originalClientes: any[] = [];
  public vendedores: any[] = [];
  public id: number;
  public user: any;
  public pedido: any[] = [];
  public valVenda: number = 0;
  public valUnit: number = 0;
  public dataId: number = 0;
  public inputs: any = [];
  public pedidoId: number;
  public getDate: any = getDate;
  public desconto: number = 10;
  public filialSelected: any = {};
  public passwordForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', [Validators.required]),
  });
  public pedidosForm: FormGroup = new FormGroup({
    data: new FormControl(null, [Validators.required]),
    loja: new FormControl('', [Validators.required]),
    vendedor: new FormControl('', [Validators.required]),
    cliente: new FormControl('', [Validators.required]),
    condPagamento: new FormControl('', [Validators.required]),
    pagPersonalizado: new FormControl(''),
    tabPreco: new FormControl(''),
    tabPersonalizado: new FormControl(''),
    produto: new FormArray([]),
    item: new FormArray([], [Validators.required]),
    descontoGeral: new FormControl(0),
    meioPagamento: new FormControl('', [Validators.required]),
    dias: new FormControl(''),
    dataVencimento: new FormControl(null),
    status: new FormControl(''),
    linkBoleto: new FormControl(''),
    linkNf: new FormControl(''),
    obs: new FormControl(''),
    total: new FormControl(0),
    tipoVenda: new FormControl(0),
    clienteId: new FormControl(null),
  });

  get item() {
    return this.pedidosForm.get('item') as FormArray;
  }

  get produto() {
    return this.pedidosForm.get('produto') as FormArray;
  }

  public status: any[] = [];
  public allProdutos: any[] = [];
  public allProdutosOriginal: any[] = [];
  public condPagamentos: any[] = []
  public usuario: any

  public resumo: any = {
    produtos: 2,
    unidades: 600,
    subtotal: 6000,
    descontos: 100,
    venda: 5900,
    frete: 300,
    total: 6200,
  };

  constructor(
    private readonly pedidoService: PedidosService,
    private readonly statusService: StatusService,
    private readonly produtoService: ProdutoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthenticationService,
    private readonly rhService: RhService,
    private readonly clienteService: ClientService,
    private readonly filialService: FilialService,
    private readonly condPagamentoService: CondicoesPagamentoService
  ) { }

  ngOnInit(): void {
    this.findCondPagamento()
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_editar) == PermissionsUsers.vendas_editar)){
      this.router.navigate(['sistema'])
    }
    for (let item of this.item.value) {
      this.totalProduto(item);
    }

    let teste = this.item['controls'];
    this.rhService.find().subscribe((data: any) => {
      for (let oneData of data) {
        if (oneData.role.toLowerCase().substring(0, 8) == 'vendedor') {
          this.vendedores.push(oneData);
        }
      }
    });
    this.authService.currentUser.subscribe((user) => {
      this.user = user.result;
      this.passwordForm.get('email')?.setValue(user.result.email);
    });
    const routerParams = this.route.snapshot.paramMap;
    this.id = Number(routerParams.get('id'));

    this.filialService.find().subscribe((data: any) => {
      this.filial = data;
    }, (err) => { }, () => {

      this.pedidoService.findOne(this.id).subscribe((data: any) => {
        this.pedido = data;
        this.pedidosForm.get('data')?.setValue(data.data.substring(10, 0));
        for (let [index, item] of this.filial.entries()) {
          if (item.nome == data.loja) {
            this.pedidosForm.get('loja')?.setValue(index);
            this.filialSelected = this.filial[index];
            console.log(this.filialSelected);
          }
        }
        // this.pedidosForm.get('loja')?.setValue(data.loja);
        this.pedidosForm.get('vendedor')?.setValue(data.vendedor);
        this.pedidosForm.get('cliente')?.setValue(data.cliente);
        this.pedidosForm.get('condPagamento')?.setValue(data.condPagamento);
        this.pedidosForm.get('pagPersonalizado')?.setValue(data.pagPersonalizado);
        this.pedidosForm.get('tabPreco')?.setValue(data.tabPreco);        
        this.pedidosForm.get('tabPersonalizado')?.setValue(data.tabPersonalizado);
        this.pedidosForm.get('descontoGeral')?.setValue(data.descontoGeral);
        this.pedidosForm.get('enderecoEntrega')?.setValue(data.enderecoEntrega);
        this.pedidosForm
          .get('valorFreteEntrega')
          ?.setValue(data.valorFreteEntrega);
        this.pedidosForm.get('meioPagamento')?.setValue(data.meioPagamento);
        this.pedidosForm.get('dias')?.setValue(data.dias);
        this.pedidosForm
          .get('dataVencimento')
          ?.setValue(data.dataVencimento.substring(10, 0));
        this.pedidosForm.get('status')?.setValue(data.status);
        this.pedidosForm.get('linkBoleto')?.setValue(data.linkBoleto);
        this.pedidosForm.get('linkNf')?.setValue(data.linkNf);
        this.pedidosForm.get('obs')?.setValue(data.obs);
        this.pedidosForm.get('total')?.setValue(data.total);
        this.pedidosForm.get('clienteId')?.setValue(data.clienteId);
        this.findClientById(data.clienteId)
        for (let item in data.item) {
          // this.changeTipoEntrega(data.item[item].prevRetirada);
          if(data.item[item].tipoEntrega == 'entrega'){
            this.changeTipoEntrega('entrega');
          }
          this.item.push(
            new FormGroup({
              pedidoId: new FormControl(data.item[item].id),
              codigo: new FormControl(data.item[item].codigo),
              produto: new FormControl(data.item[item].produto),
              quantidade: new FormControl(data.item[item].quantidade, [
                Validators.required,
              ]),
              valorUnitario: new FormControl(
                Number(data.item[item].valorUnitario)
              ),
              desconto: new FormControl(Number(data.item[item].desconto)),
              tipoRetirada: new FormControl(data.item[item].tipoRetirada),
              prevRetirada: new FormControl(
                data.item[item].prevRetirada == !null
                  ? data.item[item].prevRetirada.substring(10, 0)
                  : null
              ),
              valorFrete: new FormControl(Number(data.item[item].valorFrete)),
              valorVenda: new FormControl(Number(data.item[item].valorVenda)),
              endereco: new FormControl(
                data.item[item].tipoEntrega == 'entrega' ?
                  data.item[item].endereco :
                  this.filialSelected.logradouro + ' ' +
                  this.filialSelected.numero + ' - ' +
                  this.filialSelected.cidade + ', ' +
                  this.filialSelected.cep),
              enderecoLoja: new FormControl(data.item[item].enderecoLoja),
              tipoEntrega: new FormControl(data.item[item].tipoEntrega, [
                Validators.required,
              ]),
              total: new FormControl(data.item[item].total),
            })
          );
          this.valUnit += data.item[item].valorUnitario;
          this.valVenda += data.item[item].valorVenda;
        }
        this.clienteService.find().subscribe((data: any) => {          
          for (let cliente of data) {
            if (cliente.id == this.pedidosForm.get('clienteId')?.value) {
              this.enderecos = cliente.addresses;
            }
          }
          this.clientes = data;
          this.originalClientes = data;
        });
      });
    });
    this.produtoService.find().subscribe((data: any) => {
      this.allProdutos = data;
      this.allProdutosOriginal = data;
    });
    this.statusService.find().subscribe((data: any) => {
      this.status = data;
    });
    for (let control in this.pedidosForm['controls']) {
      document.getElementById(control)?.addEventListener('click', () => {
        if (document.getElementById(control)?.classList.contains('invalid')) {
          document.getElementById(control)?.classList.remove('invalid');
        }
      });
    }
  }

  submitForm(data: any, data2: any) {
    data.value.data = new Date(data.value.data);
    let timezone = data.value.data.getTimezoneOffset() * 60000;
    data.value.data = new Date(data.value.data + timezone).toISOString();
    data.enderecoLoja = this.filialSelected.logradouro + ' ' + this.filialSelected.numero + ' - ' + this.filialSelected.cidade + ', ' + this.filialSelected.cep
    if (data.valid) {
      this.totalValue(this.item.value);
      if (data.value.status != 'Gerado') {
        data.value.status = 'Aguardando aprova????o';
      }
      data.value.loja = this.filialSelected.nome;
      this.pedidoService.update(this.id, data.value).subscribe((dt: any) => {
        this.router.navigate(['sistema', 'vendas', 'pedidos']);
        Swal.fire({
          title: '<h4>Pedido adicionado !<h4>',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          width: '500px',
        });
      });
    } else {
      for (let control in this.pedidosForm['controls']) {
        if (this.pedidosForm['controls'][control].status === 'INVALID') {
          document.getElementById(control)?.classList.add('invalid');
        }
      }
      Swal.fire({
        title: '<h4>Preencha os campos necess??rios!</h4>',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        width: '500px',
      });
    }
  }

  public log(x: any): void {
    // console.log(x);
  }

  control() {
    this.dataId++;
  }

  /*
  { codigo: 1, produto: 'Drywall', quantidade: 50, valor_unitario: 25.90, desconto_tab: 5, desconto_ad: 0, valor_venda: 20.90 },
       { codigo: 2, produto: 'Gesso', quantidade: 4, valor_unitario: 16.90, desconto_tab: 0, desconto_ad: 0, valor_venda: 16.90 },
  */
  checkIfChecked(event: any) {
    let input = event.target;
    let codigo = Number(event.target.value);
    if (input.checked) {
      for (let produto of this.allProdutos) {
        if (produto.id == codigo) {
          this.produto.push(
            new FormGroup({
              id: new FormControl(codigo),
            })
          );
          this.item.push(
            new FormGroup({
              pedidoId: new FormControl(null),
              codigo: new FormControl(produto.id),
              produto: new FormControl(produto.nome),
              quantidade: new FormControl(null, [Validators.required]),
              desconto: new FormControl(0),
              tipoRetirada: new FormControl(''),
              prevRetirada: new FormControl(null),
              valorFrete: new FormControl(0),
              valorVenda: new FormControl(produto.precoMedio),
              endereco: new FormControl(''),
              enderecoLoja: new FormControl(''),
              tipoEntrega: new FormControl('', [Validators.required]),
              total: new FormControl(0),
            })
          );
          this.valUnit += produto.custoMedio;
          this.valVenda += produto.precoMedio;
        }
      }
    } else {
      for (let produto of this.allProdutos) {
        if (produto.id == codigo) {
          this.produto.controls.splice(
            this.produto.controls
              .map(function (e: any) {
                return e.id;
              })
              .indexOf(codigo),
            1
          );
          this.produto.value.splice(
            this.produto.value
              .map(function (e: any) {
                return e.id;
              })
              .indexOf(codigo),
            1
          );
          this.item.controls.splice(
            this.item.controls
              .map(function (e: any) {
                return e.value.codigo;
              })
              .indexOf(codigo),
            1
          );
          this.item.value.splice(
            this.item.value
              .map(function (e: any) {
                return e.codigo;
              })
              .indexOf(codigo),
            1
          );
          this.valVenda -= produto.precoMedio;
          this.valUnit -= produto.custoMedio;
        }
      }
    }
  }

  totalProduto(value: any) {
    if (this.descontoG == 0 || this.descontoG === null) {
      value.total =  value.valorVenda * value.quantidade + value.valorFrete - value.desconto;
    } else {
      value.total = value.valorVenda * value.quantidade + value.valorFrete;
    }
  }
  totalValue(value: any) {
    let total: number = 0;
    for (let item of value) {
      total += item.total;
    }
    if (this.descontoG == 0 || this.descontoG == null) {
      this.pedidosForm.get('total')?.setValue(total);
      return total;
    } else {
      this.pedidosForm.get('total')?.setValue(total - this.descontoG);
      return total - this.descontoG;
    }
  }

  checkProdutos(event: any) {
    if (this.produto.length == 0) {
      Swal.fire({
        title: 'Adicione produtos !',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  }

  filterBefore = '';
  filtrar(event: any) {
    let str = event.target.value;
    if (str != '') {
      if (str.length > this.filterBefore.length) {
        this.allProdutos = this.allProdutosOriginal.filter((user: any) =>
          `${user.id} ${user.nome} ${user.atual}  ${user.precoMedio} `
            .toUpperCase()
            .includes(str.toUpperCase())
        );
        this.filterBefore = str;
      } else {
        this.allProdutos = this.allProdutosOriginal;
        this.allProdutos = this.allProdutosOriginal.filter((user: any) =>
          `${user.id} ${user.nome} ${user.atual}  ${user.precoMedio} `
            .toUpperCase()
            .includes(str.toUpperCase())
        );
        this.filterBefore = str;
      }
    } else {
      this.allProdutos = this.allProdutosOriginal;
    }
  }

  check(data: number): any {
    let pos = this.item.value.map((e: any) => {
      return e.codigo;
    });
    if (pos.indexOf(data) != -1) {
      return true;
    }
  }

  totalQuanti(data: any): any {
    let total = 0;
    for (let item of data) {
      total += item.quantidade;
    }
    return total;
  }

  changeDesconto(data: any): any {
    let total = 0;
    for (let item of data) {
      total += Number(item.desconto);
    }
    return total;
  }

  setThisFrete(data: any, data2: any) {
    data.valorFrete = Number(
      String(data2.target.value)
        .substring(3, String(data2.target.value).length)
        .replace(',', '.')
    );
  }

  changeFrete(data: any) {
    if (data.length == 0) {
      return 0;
    }
    let total = 0;
    for (let item of data) {
      total += item.valorFrete;
    }
    return total;
  }

  savePdf() {
    // const doc = new jsPDF();
    // doc.text("Hello world!", 10, 10);
    // doc.save("relatorio-faltas.pdf");

    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('relatorio-pedidos-venda.pdf');
      },
    });
  }

  gerarPedido(data: any, allForm: any) {
    if (this.user.permission == 1) {
      if (
        this.changeDesconto(this.item.value) == 0 &&
        this.pedidosForm.get('descontoGeral')?.value == 0
      ) {
        if (allForm.valid) {
          this.totalValue(this.item.value);
          allForm.value.status = 'Gerado';
          this.pedidoService.create(allForm.value).subscribe((data: any) => {
            this.router.navigate(['sistema', 'vendas', 'pedidos']);
            Swal.fire({
              title: '<h4>Pedido gerado !</h4>',
              icon: 'success',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              width: '500px',
            });
          });
        } else {
          Swal.fire({
            title: '<h4>Preencha todos os campos necess??rios !</h4>',
            icon: 'error',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            width: '500px',
          });
        }
      } else {
        this.authService.checkPassword(data.value).subscribe((data: any) => {
          if (data == true) {
            Swal.fire({
              title: '<h4>Senha correta !</h4>',
              icon: 'success',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              width: '500px',
            });
            this.passwordForm.get('password')?.setValue('');
            if (allForm.valid) {
              this.totalValue(this.item.value);
              allForm.value.status = 'Gerado';
              this.pedidoService
                .create(allForm.value)
                .subscribe((data: any) => {
                  this.router.navigate(['sistema', 'vendas', 'pedidos']);
                  Swal.fire({
                    title: '<h4>Pedido gerado !</h4>',
                    icon: 'success',
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    width: '500px',
                  });
                });
            } else {
              Swal.fire({
                title: '<h4>Preencha todos os campos necess??rios !</h4>',
                icon: 'error',
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                width: '500px',
              });
            }
          } else {
            Swal.fire({
              title: '<h4>Senha Incorreta!</h4>',
              icon: 'error',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              width: '500px',
            });
            this.passwordForm.get('password')?.setValue('');
          }
        });
      }
    } else {
      Swal.fire({
        title: '<h4>Voc?? n??o tem permiss??o para realizar esta a????o !</h4>',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        width: '500px',
      });
    }
  }

  cancelarPedido(id: number) {
    Swal.fire({
      title: 'Voc?? gostaria de cancelar este pedido?',
      text: 'Ao cancelar este pedido, ele ser?? deletado !',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `N??o`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.pedidoService.delete(id).subscribe((data: any) => {
          this.router.navigate(['sistema', 'vendas', 'pedidos']);
          Swal.fire({
            title: '<h4>Pedido Cancelado !</h4>',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            width: '500px',
          });
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: '<h4>O pedido n??o foi cancelado!</h4>',
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

  filterBeforeCliente = '';
  filtrarCliente(event: any) {
    this.showSign = true;
    let str = event.target.value;
    if (str != '') {
      if (str.length > this.filterBeforeCliente.length) {
        this.clientes = this.originalClientes.filter((user: any) =>
          `${user.name} ${user.surname} ${user.fantasyName}`
            .toUpperCase()
            .includes(str.toUpperCase())
        );
        this.filterBeforeCliente = str;
      } else {
        this.clientes = this.originalClientes;
        this.clientes = this.originalClientes.filter((user: any) =>
          `${user.name} ${user.surname} ${user.fantasyName}`
            .toUpperCase()
            .includes(str.toUpperCase())
        );
        this.filterBeforeCliente = str;
      }
      if (this.clientes.length == 0) {
        this.showSign = false;
      }
    } else {
      this.clientes = this.originalClientes;
      this.showSign = false;
    }
  }

  selectThisCliente(value: any) {
    let addresses = [];
    addresses = value.addresses;
    if (value.name != null && value.surname != null) {
      this.pedidosForm
        .get('cliente')
        ?.setValue(`${value.name} ${value.surname}`);
      this.pedidosForm.get('clienteId')?.setValue(value.id);
      this.showSign = false;
    } else {
      this.pedidosForm.get('cliente')?.setValue(`${value.fantasyName}`);
      this.pedidosForm.get('clienteId')?.setValue(value.id);
      this.showSign = false;
    }
    this.enderecos = value.addresses;
  }

  descontoGeral(event: any) {
    let total = Number(event.descontoGeral);
    for (let item of this.item.value) {
      item.desconto = 0;
    }
    for (let item of this.item['controls']) {
      if (
        item.get('desconto')?.value != null ||
        item.get('desconto')?.value != 0
      ) {
        item.get('desconto')?.setValue(0);
      }
    }
    this.descontoG = total;
    for (let item of this.item.value) {
      this.totalProduto(item);
    }
  }

  cleanDesconto() {
    if (
      this.pedidosForm.get('descontoGeral')?.value != null ||
      this.pedidosForm.get('descontoGeral')?.value != ''
    ) {
      this.pedidosForm.get('descontoGeral')?.setValue('');
      this.descontoG = 0;
    }
  }

  checkClient(event: any) {
    let input = event.target.value;
    for (let cliente of this.clientes) {
      if (input == `${cliente.name} ${cliente.surname}`) {
        this.selectThisCliente(cliente);
      } else if (input == `${cliente.fantasyName}`) {
        this.selectThisCliente(cliente);
      }
    }
  }

  changeTipoEntrega(value: string, oneItem?: any) {
    if (value == 'retirada' && oneItem != null) {
      oneItem.value.endereco = this.filialSelected.logradouro + ' ' + this.filialSelected.numero + ' - ' + this.filialSelected.cidade + ', ' + this.filialSelected.cep;
    } else {
      this.tipoEntregaVar = value;
    }
  }

  setFilialSelected(filial: number) {
    this.filialSelected = this.filial[filial];
    // console.log(this.filialSelected);
  }

  findCondPagamento() {
    this.condPagamentoService.findAll().subscribe((resp) => {
      this.condPagamentos = resp
    })
  }

  findClientById(id: any) {
    this.clienteService.findOne(id).subscribe((resp) => {
    this.usuario = resp
    })
  }
}
