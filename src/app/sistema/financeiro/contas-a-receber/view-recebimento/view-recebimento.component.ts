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
  styleUrls: ['./view-recebimento.component.scss']
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


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  loadForm(contasInput: any) {
    this.viewRecebimentoForm = new FormGroup({
      descricao: new FormControl({
        value: contasInput.descricao,
        disabled: true,
      }),
      formaPagamento: new FormControl(
        contasInput.formaPagamento,
        Validators.required
      ),
      plano: new FormControl({
        value: contasInput.plano,
        disabled: true,
      }),
      vencimento: new FormControl({
        value: contasInput.vencimento,
        disabled: true,
      }),
      valorBruto: new FormControl({
        value: contasInput.valorBruto,
        disabled: true,
      }),
      juros: new FormControl({
        value: contasInput.juros,
        disabled: true,
      }),
      desconto: new FormControl({
        value: contasInput.desconto,
        disabled: true,
      }),
      compensado: new FormControl({
        value: contasInput.compensado,
        disabled: true,
      }),
      situacao: new FormControl({
        value: contasInput.situacao,
        disabled: true,
      }),
      unidade: new FormControl({
        value: contasInput.unidade,
        disabled: true,
      }),
      valorTotal: new FormControl({
        value: contasInput.valorTotal,
        disabled: true,
      }),
      cliente: new FormControl({
        value: contasInput.cliente,
        disabled: true,
      }),
      centroCusto: new FormControl({
        value: contasInput.centroCusto,
        disabled: true,
      }),
      data: new FormControl({
        value: contasInput.data,
        disabled: true,
      }),
      obs: new FormControl({
        value: contasInput.obs,
        disabled: true,
      }),
    });
  }

}
