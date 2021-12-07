import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../../../services/produto.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { FornecedorService } from 'src/app/services/fornecedores.service';

@Component({
  selector: 'app-adicionar-produto-estoque',
  templateUrl: './adicionar-produto-estoque.component.html',
  styleUrls: ['./adicionar-produto-estoque.component.scss'],
})
export class AdicionarProdutoEstoqueComponent implements OnInit {
  fornecedores: any[] = [];

  produtoAddForm = new FormGroup({
    destinacao: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    sku: new FormControl('', Validators.required),
    ativo: new FormControl(true, Validators.required),
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    unidade: new FormControl('', Validators.required),
    largura: new FormControl('', Validators.required),
    altura: new FormControl('', Validators.required),
    peso: new FormControl('', Validators.required),
    itens: new FormControl('', Validators.required),
    getinEan: new FormControl('', Validators.required),
    min: new FormControl('', Validators.required),
    max: new FormControl('', Validators.required),
    atual: new FormControl('', Validators.required),
    localizacao: new FormControl('', Validators.required),
    custoMedio: new FormControl('', Validators.required),
    precoMedio: new FormControl('', Validators.required),
    margemLucro: new FormControl('', Validators.required),
    comissao: new FormControl('', Validators.required),
    fornecedores: new FormArray([
      new FormGroup({
        id: new FormControl(null, Validators.required),
      }),
    ]),
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
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {
    this.fornecedorService.find().subscribe((data: any) => {
      this.fornecedores = data;
    });
  }

  get fornecedorArray() {
    return this.produtoAddForm.get('fornecedores')! as FormArray;
  }

  save(): void | Promise<SweetAlertResult<any>> {
    if (this.produtoAddForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos obrigatórios!',
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
}
