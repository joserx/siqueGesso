import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ContasReceberService } from 'src/app/services/contas-receber.service';
import { ClientService } from 'src/app/services/client.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-adicionar-recebimento',
  templateUrl: './adicionar-recebimento.component.html',
  styleUrls: ['./adicionar-recebimento.component.scss'],
})
export class AdicionarRecebimentoComponent implements OnInit {
  public clientes: any = [];

  public recebimento: any = {
    valorBruto: '',
    juros: '',
    desconto: '',
    total: '',
  };

  recebimentoForm: FormGroup = this.fb.group({
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
    cliente: [''],
    centroCusto: [''],
    data: [''],
    obs: [''],
  });

  @Output() reload = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private contasReceberService: ContasReceberService,
    private clientService : ClientService,
  ) {}

  ngOnInit(): void {
    this.getClientes()
  }

  getClientes() {
    this.clientService.find().subscribe((res) => {
      this.clientService.clientes = res;
      this.clientes = res;
    });
  }

  aplicarValorBruto(valorBruto: string) {
    console.log('teste');

    let valor = Number(valorBruto);
    this.recebimento.valorBruto = valor;
    this.atualizarTotalRecebimento();
  }

  aplicarJuros(juros: string) {
    let fees = Number(juros);
    this.recebimento.juros = fees;
    this.atualizarTotalRecebimento();
  }

  aplicarDesconto(desconto: string) {
    let discount = Number(desconto);
    this.recebimento.desconto = discount;
    this.atualizarTotalRecebimento();
  }

  public atualizarTotalRecebimento(): void {
    let oneItem = 0;
    oneItem =
      Number(String(this.recebimentoForm.get('valorBruto')?.value)) -
      Number(String(this.recebimentoForm.get('desconto')?.value)) +
      Number(String(this.recebimentoForm.get('juros')?.value));

    this.recebimentoForm.controls['valorTotal'].setValue(oneItem);
  }

  submit(): any {
    console.log(this.recebimentoForm.value);

    if (this.recebimentoForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos corretamente!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    this.contasReceberService
      .create(this.recebimentoForm.value)
      .subscribe(() => {
        this.reload.emit();
        // this.closeBtn.nativeElement.click();
        this.recebimentoForm.reset();
        return Swal.fire({
          title: 'Recebimento salvo!',
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
