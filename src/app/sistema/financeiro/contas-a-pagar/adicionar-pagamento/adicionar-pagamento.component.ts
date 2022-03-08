import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ContasPagarService } from 'src/app/services/contas-pagar.service';
import { FornecedorService } from 'src/app/services/fornecedores.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-adicionar-pagamento',
  templateUrl: './adicionar-pagamento.component.html',
  styleUrls: ['./adicionar-pagamento.component.scss'],
})
export class AdicionarPagamentoComponent implements OnInit {
  public fornecedores: any = [];

  public pagamento: any = {
    valorBruto: '',
    juros: '',
    desconto: '',
    total: '',
  };

  pagamentoForm: FormGroup = this.fb.group({
    descricao: [''],
    formaPagamento: [''],
    plano: [''],
    vencimento: [''],
    valorBruto: [''],
    juros: [''],
    desconto: [''],
    compensado: [''],
    situacao: [''],
    unidade: [''],
    valorTotal: [''],
    fornecedor: [''],
    centroCusto: [''],
    data: [''],
    obs: [''],
  });

  @Output() reload = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private contasPagarService: ContasPagarService,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {}

  getFornecedores() {
    this.fornecedorService.find().subscribe((res) => {
      this.fornecedorService.fornecedores = res;
      this.fornecedores = res;
    });
  }

  aplicarValorBruto(valorBruto: string) {
    let valor = Number(valorBruto);
    this.pagamento.valorBruto = valor;
    this.atualizarTotalPagamento();
  }

  aplicarJuros(juros: string) {
    let fees = Number(juros);
    this.pagamento.juros = fees;
    this.atualizarTotalPagamento();
  }

  aplicarDesconto(desconto: string) {
    let discount = Number(desconto);
    this.pagamento.desconto = discount;
    this.atualizarTotalPagamento();
  }

  public atualizarTotalPagamento(): void {
    let oneItem = 0;
    oneItem =
      Number(String(this.pagamentoForm.get('valorBruto')?.value)) -
      Number(String(this.pagamentoForm.get('desconto')?.value)) +
      Number(String(this.pagamentoForm.get('juros')?.value));

    this.pagamentoForm.controls['valorTotal'].setValue(oneItem);
  }

  submit(): any {
    console.log(this.pagamentoForm.value);

    if (this.pagamentoForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos corretamente!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    this.contasPagarService.create(this.pagamentoForm.value).subscribe(() => {
      this.reload.emit();
      // this.closeBtn.nativeElement.click();
      this.pagamentoForm.reset();
      return Swal.fire({
        title: 'Pagamento salvo!',
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
