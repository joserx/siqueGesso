import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ProdutoService } from '../../../../services/produto.service';

@Component({
  selector: 'app-edit-produto-estoque',
  templateUrl: './edit-produto-estoque.component.html',
  styleUrls: ['./edit-produto-estoque.component.scss'],
})
export class EditProdutoEstoqueComponent implements OnInit {
  produtoEditForm = new FormGroup({
    destinacao: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    sku: new FormControl('', Validators.required),
    ativo: new FormControl(''),
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

  public fornecedoresUsuais: any = [{}];
  public fornecedores: any = [];
  fornecedorArray: any;
  produtoId: number;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {}

  loadForm(produtoInput: any) {
    this.produtoId = produtoInput.id;
    this.produtoEditForm = new FormGroup({
      destinacao: new FormControl(produtoInput.destinacao, Validators.required),
      categoria: new FormControl(produtoInput.categoria, Validators.required),
      sku: new FormControl(produtoInput.sku, Validators.required),
      ativo: new FormControl(produtoInput.ativo),
      nome: new FormControl(produtoInput.nome, Validators.required),
      descricao: new FormControl(produtoInput.descricao, Validators.required),
      unidade: new FormControl(produtoInput.unidade, Validators.required),
      largura: new FormControl(produtoInput.largura, Validators.required),
      altura: new FormControl(produtoInput.altura, Validators.required),
      peso: new FormControl(produtoInput.peso, Validators.required),
      itens: new FormControl(produtoInput.itens, Validators.required),
      getinEan: new FormControl(produtoInput.getinEan, Validators.required),
      min: new FormControl(produtoInput.min, Validators.required),
      max: new FormControl(produtoInput.max, Validators.required),
      atual: new FormControl(produtoInput.atual, Validators.required),
      localizacao: new FormControl(
        produtoInput.localizacao,
        Validators.required
      ),
      custoMedio: new FormControl(produtoInput.custoMedio, Validators.required),
      precoMedio: new FormControl(produtoInput.precoMedio, Validators.required),
      margemLucro: new FormControl(
        produtoInput.margemLucro,
        Validators.required
      ),
      comissao: new FormControl(produtoInput.comissao, Validators.required),

      origem: new FormControl(produtoInput.origem, Validators.required),
      ncm: new FormControl(produtoInput.ncm, Validators.required),
      cest: new FormControl(produtoInput.cest, Validators.required),
      tributos: new FormControl(produtoInput.tributos, Validators.required),
      valorBaseIcms: new FormControl(
        produtoInput.valorBaseIcms,
        Validators.required
      ),
      valorIcms: new FormControl(produtoInput.valorIcms, Validators.required),
      valorIcmsProprio: new FormControl(
        produtoInput.valorIcmsProprio,
        Validators.required
      ),
      codigoTipi: new FormControl(produtoInput.codigoTipi, Validators.required),
      valorPis: new FormControl(produtoInput.valorPis, Validators.required),
      valorConfins: new FormControl(
        produtoInput.valorConfins,
        Validators.required
      ),
      infoAdd: new FormControl(produtoInput.infoAdd, Validators.required),
    });
  }

  save(): void | Promise<SweetAlertResult<any>> {
    if (this.produtoEditForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos obrigatórios!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    // console.log(this.produtoEditForm.value);

    this.produtoService
      .update(this.produtoId, this.produtoEditForm.value)
      .subscribe(() => {
        this.closeBtn.nativeElement.click();
        this.reload.emit();
        return Swal.fire({
          title: 'Produto Salvo!',
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
