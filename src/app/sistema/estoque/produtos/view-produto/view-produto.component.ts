import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedorService } from 'src/app/services/fornecedores.service';

@Component({
  selector: 'app-view-produto',
  templateUrl: './view-produto.component.html',
  styleUrls: ['./view-produto.component.scss']
})
export class ViewProdutoComponent implements OnInit {

  fornecedores: any
  fornecedorForm = new FormGroup({
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
    fornecedores: new FormArray([new FormGroup({
      id: new FormControl(null, Validators.required)
    })]),
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
    infoAdd: new FormControl('', Validators.required)
  })

  @Input() produto: any

  constructor(
    private fornecedorService: FornecedorService
  ) { }

  get fornecedorArray() { return this.fornecedorForm.get('fornecedores')! as FormArray }

  ngOnInit(): void {
    console.log(this.produto)
    if (!this.fornecedorService.fornecedores)
      this.fornecedorService.find().subscribe(res => {
        this.fornecedorService.fornecedores = res
        this.fornecedores = res
      })
    else this.fornecedores = this.fornecedorService.fornecedores
  }

}
