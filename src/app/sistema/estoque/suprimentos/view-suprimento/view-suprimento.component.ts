import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-suprimento',
  templateUrl: './view-suprimento.component.html',
  styleUrls: ['./view-suprimento.component.scss'],
})
export class ViewSuprimentoComponent implements OnInit {
  suprimentoForm = new FormGroup({
    nome: new FormControl({ value: '', disabled: true }, Validators.required),
    codigo: new FormControl({ value: '', disabled: true }, Validators.required),
    categoria: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    descricao: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    quantidade: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    precoCusto: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    estoqueAtual: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    estoqueMin: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  @Input() suprimento: any;

  constructor() {}

  ngOnInit(): void {}

  loadForm(suprimentoInput: any) {
    this.suprimentoForm = new FormGroup({
      nome: new FormControl(
        { value: suprimentoInput.nome, disabled: true },
        Validators.required
      ),
      codigo: new FormControl(
        { value: suprimentoInput.codigo, disabled: true },
        Validators.required
      ),
      categoria: new FormControl(
        { value: suprimentoInput.categoria, disabled: true },
        Validators.required
      ),
      descricao: new FormControl(
        { value: suprimentoInput.descricao, disabled: true },
        Validators.required
      ),
      quantidade: new FormControl(
        { value: suprimentoInput.quantidade, disabled: true },
        Validators.required
      ),
      precoCusto: new FormControl(
        { value: suprimentoInput.precoCusto, disabled: true },
        Validators.required
      ),
      estoqueAtual: new FormControl(
        { value: suprimentoInput.estoqueAtual, disabled: true },
        Validators.required
      ),
      estoqueMin: new FormControl(
        { value: suprimentoInput.estoqueMin, disabled: true },
        Validators.required
      ),
    });
  }
}
