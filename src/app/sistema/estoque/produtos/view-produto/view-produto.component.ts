import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedorService } from 'src/app/services/fornecedores.service';

@Component({
  selector: 'app-view-produto',
  templateUrl: './view-produto.component.html',
  styleUrls: ['./view-produto.component.scss'],
})
export class ViewProdutoComponent implements OnInit {
  fornecedores: any;
  produtoAddForm = new FormGroup({
    destinacao: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    categoria: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    sku: new FormControl({ value: '', disabled: true }, Validators.required),
    ativo: new FormControl({ value: '', disabled: true }),
    nome: new FormControl({ value: '', disabled: true }, Validators.required),
    custoMedio: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    precoMedio: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    margemLucro: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    comissao: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    fornecedores: new FormArray([
      new FormGroup({
        id: new FormControl(null, Validators.required),
      }),
    ]),
    descricao: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    unidade: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    largura: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    altura: new FormControl({ value: '', disabled: true }, Validators.required),
    peso: new FormControl({ value: '', disabled: true }, Validators.required),
    itens: new FormControl({ value: '', disabled: true }),
    getinEan: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    min: new FormControl({ value: '', disabled: true }, Validators.required),
    max: new FormControl({ value: '', disabled: true }, Validators.required),
    atual: new FormControl({ value: '', disabled: true }, Validators.required),
    localizacao: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    origem: new FormControl({ value: '', disabled: true }, Validators.required),
    ncm: new FormControl({ value: '', disabled: true }, Validators.required),
    cest: new FormControl({ value: '', disabled: true }, Validators.required),
    tributos: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    valorBaseIcms: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    valorIcms: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    valorIcmsProprio: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    codigoTipi: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    valorPis: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    valorConfins: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    infoAdd: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  @Input() produto: any;

  constructor(private fornecedorService: FornecedorService) {}

  get fornecedorArray() {
    return this.produtoAddForm.get('fornecedores')! as FormArray;
  }

  ngOnInit(): void {}

  loadForm(produtoInput: any) {
    this.produtoAddForm = new FormGroup({
      destinacao: new FormControl(
        { value: produtoInput.destinacao, disabled: true },
        Validators.required
      ),
      categoria: new FormControl(
        { value: produtoInput.categoria, disabled: true },
        Validators.required
      ),
      sku: new FormControl(
        { value: produtoInput.sku, disabled: true },
        Validators.required
      ),
      ativo: new FormControl({ value: produtoInput.ativo, disabled: true }),
      nome: new FormControl(
        { value: produtoInput.nome, disabled: true },
        Validators.required
      ),
      custoMedio: new FormControl(
        { value: produtoInput.custoMedio, disabled: true },
        Validators.required
      ),
      precoMedio: new FormControl(
        { value: produtoInput.precoMedio, disabled: true },
        Validators.required
      ),
      margemLucro: new FormControl(
        { value: produtoInput.margemLucro, disabled: true },
        Validators.required
      ),
      comissao: new FormControl(
        { value: produtoInput.comissao, disabled: true },
        Validators.required
      ),
      fornecedores: new FormArray([
        new FormGroup({
          id: new FormControl(
            { value: produtoInput.fornecedores, disabled: true },
            Validators.required
          ),
        }),
      ]),
      descricao: new FormControl(
        { value: produtoInput.descricao, disabled: true },
        Validators.required
      ),
      unidade: new FormControl(
        { value: produtoInput.unidade, disabled: true },
        Validators.required
      ),
      largura: new FormControl(
        { value: produtoInput.largura, disabled: true },
        Validators.required
      ),
      altura: new FormControl(
        { value: produtoInput.altura, disabled: true },
        Validators.required
      ),
      peso: new FormControl(
        { value: produtoInput.peso, disabled: true },
        Validators.required
      ),
      itens: new FormControl({ value: produtoInput.itens, disabled: true }),
      getinEan: new FormControl(
        { value: produtoInput.getinEan, disabled: true },
        Validators.required
      ),
      min: new FormControl(
        { value: produtoInput.min, disabled: true },
        Validators.required
      ),
      max: new FormControl(
        { value: produtoInput.max, disabled: true },
        Validators.required
      ),
      atual: new FormControl(
        { value: produtoInput.atual, disabled: true },
        Validators.required
      ),
      localizacao: new FormControl(
        { value: produtoInput.localizacao, disabled: true },
        Validators.required
      ),
      origem: new FormControl(
        { value: produtoInput.origem, disabled: true },
        Validators.required
      ),
      ncm: new FormControl(
        { value: produtoInput.ncm, disabled: true },
        Validators.required
      ),
      cest: new FormControl(
        { value: produtoInput.cest, disabled: true },
        Validators.required
      ),
      tributos: new FormControl(
        { value: produtoInput.tributos, disabled: true },
        Validators.required
      ),
      valorBaseIcms: new FormControl(
        { value: produtoInput.valorBaseIcms, disabled: true },
        Validators.required
      ),
      valorIcms: new FormControl(
        { value: produtoInput.valorIcms, disabled: true },
        Validators.required
      ),
      valorIcmsProprio: new FormControl(
        { value: produtoInput.valorIcmsaProprio, disabled: true },
        Validators.required
      ),
      codigoTipi: new FormControl(
        { value: produtoInput.codigoTipi, disabled: true },
        Validators.required
      ),
      valorPis: new FormControl(
        { value: produtoInput.valorPis, disabled: true },
        Validators.required
      ),
      valorConfins: new FormControl(
        { value: produtoInput.valorConfins, disabled: true },
        Validators.required
      ),
      infoAdd: new FormControl(
        { value: produtoInput.indoAdd, disabled: true },
        Validators.required
      ),
    });
  }
}
