import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FornecedorService } from 'src/app/services/fornecedores.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProdutoService } from 'src/app/services/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adicionar-produtos',
  templateUrl: './adicionar-produtos.component.html',
  styleUrls: ['./adicionar-produtos.component.scss'],
})
export class AdicionarProdutosComponent implements OnInit {
  tabelas = [{ nome: 'a' }, { nome: 'b' }, { nome: 'c' }, { nome: 'd' }];
  // letras = [
  //   'a',
  //   'b',
  //   'c',
  //   'd',
  //   'e',
  //   'f',
  //   'g',
  //   'h',
  //   'i',
  //   'j',
  //   'k',
  //   'l',
  //   'm',
  //   'n',
  //   'o',
  //   'p',
  //   'q',
  //   'r',
  //   's',
  //   't',
  //   'u',
  //   'v',
  //   'w',
  //   'x',
  //   'y',
  //   'z',
  // ];

  fornecedores: any;

  produtoAddForm = new FormGroup({
    destinacao: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    sku: new FormControl('', Validators.required),
    ativo: new FormControl(''),
    nome: new FormControl('', Validators.required),
    custoMedio: new FormControl('', Validators.required),
    precoMedio: new FormControl('', Validators.required),
    margemLucro: new FormControl('', Validators.required),
    comissao: new FormControl('', Validators.required),
    fornecedores: new FormArray([
      new FormGroup({
        id: new FormControl('', Validators.required),
      }),
    ]),
    descricao: new FormControl('', Validators.required),
    unidade: new FormControl('', Validators.required),
    largura: new FormControl('', Validators.required),
    altura: new FormControl('', Validators.required),
    peso: new FormControl('', Validators.required),
    itens: new FormControl(''),
    getinEan: new FormControl('', Validators.required),
    min: new FormControl('', Validators.required),
    max: new FormControl('', Validators.required),
    atual: new FormControl('', Validators.required),
    localizacao: new FormControl('', Validators.required),
    origem: new FormControl('', Validators.required),
    ncm: new FormControl('', Validators.required),
    cest: new FormControl('', Validators.required),
    tributos: new FormControl('', Validators.required),
    valorBaseIcms: new FormControl('', Validators.required),
    valorIcms: new FormControl('', Validators.required),
    valorIcmsProprio: new FormControl('', Validators.required),
    codigoTipi: new FormControl('', Validators.required),
    valorPis: new FormControl('', Validators.required),
    valorConfins: new FormControl('', Validators.required),
    infoAdd: new FormControl('', Validators.required),
  });

  @ViewChild('close') closeBtn: any;
  @Output() reload = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService,
    private pedidoService: PedidosService
  ) {}

  ngOnInit(): void {
    this.pedidoService.find().subscribe((data: any) => {});
    if (!this.fornecedorService.fornecedores)
      this.fornecedorService.find().subscribe((res) => {
        this.fornecedorService.fornecedores = res;
        this.fornecedores = res;
      });
    else this.fornecedores = this.fornecedorService.fornecedores;
  }

  get fornecedorArray() {
    return this.produtoAddForm.get('fornecedores')! as FormArray;
  }

  adicionarFornecedorPadrao(): any {
    this.fornecedorArray.push(
      this.formBuilder.group({
        id: [null, Validators.required],
      })
    );
  }

  removerFornecedorPadrao(i: number) {
    this.fornecedorArray.removeAt(i);
  }

  submit(): any {
    console.log(this.produtoAddForm);
    if (this.produtoAddForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos corretamente!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    this.produtoService.create(this.produtoAddForm.value).subscribe(() => {
      this.reload.emit();
      this.closeBtn.nativeElement.click();
      this.produtoAddForm.reset();
      return Swal.fire({
        title: 'Produto salvo!',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    });
  }

  adicionarTabela() {
    let proximaLetra = this.tabelas[this.tabelas.length - 1].nome;
    proximaLetra = String.fromCharCode(proximaLetra.charCodeAt(0) + 1);
    this.tabelas.push({ nome: proximaLetra });
  }
}
