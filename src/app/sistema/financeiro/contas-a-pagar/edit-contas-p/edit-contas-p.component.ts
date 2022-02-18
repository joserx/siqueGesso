import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { ContasPagarService } from 'src/app/services/contas-pagar.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-contas-p',
  templateUrl: './edit-contas-p.component.html',
  styleUrls: ['./edit-contas-p.component.scss'],
})
export class EditContasPComponent implements OnInit {
  editPagamentoForm: FormGroup = this.fb.group({
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

  @ViewChild('close') closeBtn: any;
  @Output() reload = new EventEmitter();

  contasId: number;

  constructor(
    private fb: FormBuilder,
    private contasPagarService: ContasPagarService
  ) {}

  ngOnInit(): void {}

  loadForm(contasInput: any) {
    this.contasId = contasInput.id;
    this.editPagamentoForm = new FormGroup({
      descricao: new FormControl(contasInput.descricao, Validators.required),
      formaPagamento: new FormControl(contasInput.formaPagamento, Validators.required),
      plano: new FormControl(contasInput.plano, Validators.required),
      vencimento: new FormControl(contasInput.vencimento, Validators.required),
      valorBruto: new FormControl(contasInput.valorBruto, Validators.required),
      juros: new FormControl(contasInput.juros, Validators.required),
      desconto: new FormControl(contasInput.desconto, Validators.required),
      compensado: new FormControl(contasInput.compensado, Validators.required),
      situacao: new FormControl(contasInput.situacao, Validators.required),
      unidade: new FormControl(contasInput.unidade),
      valorTotal: new FormControl(contasInput.valorTotal),
      fornecedor: new FormControl(contasInput.fornecedor),
      centroCusto: new FormControl(contasInput.centroCusto),
      data: new FormControl(contasInput.data),
      obs: new FormControl(contasInput.obs),
    })
  }

  submit(): any {
    console.log(this.editPagamentoForm.value);

    if (this.editPagamentoForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos corretamente!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    this.contasPagarService.update(this.contasId,this.editPagamentoForm.value).subscribe(() => {
      this.reload.emit();
      // this.closeBtn.nativeElement.click();
      this.editPagamentoForm.reset();
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
