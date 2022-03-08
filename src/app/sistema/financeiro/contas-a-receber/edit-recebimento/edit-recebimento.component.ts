import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { ContasReceberService } from 'src/app/services/contas-receber.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-recebimento',
  templateUrl: './edit-recebimento.component.html',
  styleUrls: ['./edit-recebimento.component.scss'],
})
export class EditRecebimentoComponent implements OnInit {
  editRecebimentoForm: FormGroup = this.fb.group({
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

  @ViewChild('close') closeBtn: any;
  @Output() reload = new EventEmitter();

  recebimentosId: number;


  constructor(
    private fb: FormBuilder,
    private contasReceberService: ContasReceberService
  ) {}

  ngOnInit(): void {}

  loadForm(recebimentosInput: any) {
    this.recebimentosId = recebimentosInput.id;
    this.editRecebimentoForm = new FormGroup({
      descricao: new FormControl(recebimentosInput.descricao, Validators.required),
      formaPagamento: new FormControl(recebimentosInput.formaPagamento, Validators.required),
      plano: new FormControl(recebimentosInput.plano, Validators.required),
      vencimento: new FormControl(recebimentosInput.vencimento, Validators.required),
      valorBruto: new FormControl(recebimentosInput.valorBruto, Validators.required),
      juros: new FormControl(recebimentosInput.juros, Validators.required),
      desconto: new FormControl(recebimentosInput.desconto, Validators.required),
      compensado: new FormControl(recebimentosInput.compensado, Validators.required),
      situacao: new FormControl(recebimentosInput.situacao, Validators.required),
      unidade: new FormControl(recebimentosInput.unidade),
      valorTotal: new FormControl(recebimentosInput.valorTotal),
      cliente: new FormControl(recebimentosInput.fornecedor),
      centroCusto: new FormControl(recebimentosInput.centroCusto),
      data: new FormControl(recebimentosInput.data),
      obs: new FormControl(recebimentosInput.obs),
    })
  }

  submit(): any {
    console.log(this.editRecebimentoForm.value);

    if (this.editRecebimentoForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos corretamente!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    this.contasReceberService.update(this.recebimentosId,this.editRecebimentoForm.value).subscribe(() => {
      this.reload.emit();
      // this.closeBtn.nativeElement.click();
      this.editRecebimentoForm.reset();
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
