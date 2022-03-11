import { Component, OnInit, Input } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-view-recebimento',
  templateUrl: './view-recebimento.component.html',
  styleUrls: ['./view-recebimento.component.scss'],
})
export class ViewRecebimentoComponent implements OnInit {
  viewRecebimentoForm: FormGroup = this.fb.group({
    descricao: [{ value: '', disabled: true }],
    formaPagamento: [{ value: '', disabled: true }],
    plano: [{ value: '', disabled: true }],
    vencimento: [{ value: '', disabled: true }],
    valorBruto: [{ value: '', disabled: true }],
    juros: [{ value: '', disabled: true }],
    desconto: [{ value: '', disabled: true }],
    compensado: [{ value: '', disabled: true }],
    situacao: [{ value: '', disabled: true }],
    unidade: [{ value: '', disabled: true }],
    valorTotal: [{ value: '', disabled: true }],
    cliente: [{ value: '', disabled: true }],
    centroCusto: [{ value: '', disabled: true }],
    data: [{ value: '', disabled: true }],
    obs: [{ value: '', disabled: true }],
  });

  @Input() recebimento: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  loadForm(recebimentoInput: any) {
    this.viewRecebimentoForm = new FormGroup({
      descricao: new FormControl({
        value: recebimentoInput.descricao,
        disabled: true,
      }),
      formaPagamento: new FormControl(
        recebimentoInput.formaPagamento,
        Validators.required
      ),
      plano: new FormControl({
        value: recebimentoInput.plano,
        disabled: true,
      }),
      vencimento: new FormControl({
        value: recebimentoInput.vencimento,
        disabled: true,
      }),
      valorBruto: new FormControl({
        value: recebimentoInput.valorBruto,
        disabled: true,
      }),
      juros: new FormControl({
        value: recebimentoInput.juros,
        disabled: true,
      }),
      desconto: new FormControl({
        value: recebimentoInput.desconto,
        disabled: true,
      }),
      compensado: new FormControl({
        value: recebimentoInput.compensado,
        disabled: true,
      }),
      situacao: new FormControl({
        value: recebimentoInput.situacao,
        disabled: true,
      }),
      unidade: new FormControl({
        value: recebimentoInput.unidade,
        disabled: true,
      }),
      valorTotal: new FormControl(recebimentoInput.valorTotal),
      cliente: new FormControl({
        value: recebimentoInput.cliente,
        disabled: true,
      }),
      centroCusto: new FormControl({
        value: recebimentoInput.centroCusto,
        disabled: true,
      }),
      data: new FormControl({
        value: recebimentoInput.data,
        disabled: true,
      }),
      obs: new FormControl({
        value: recebimentoInput.obs,
        disabled: true,
      }),
    });
  }
}
