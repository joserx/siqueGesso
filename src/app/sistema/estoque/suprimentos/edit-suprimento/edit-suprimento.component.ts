import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SuprimentoService } from '../../../../services/suprimentos.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-edit-suprimento',
  templateUrl: './edit-suprimento.component.html',
  styleUrls: ['./edit-suprimento.component.scss'],
})
export class EditSuprimentoComponent implements OnInit {
  suprimentoForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    nome: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
    precoCusto: new FormControl('', Validators.required),
    estoqueAtual: new FormControl('', Validators.required),
    estoqueMin: new FormControl(Validators.required),
  });

  @ViewChild('close') closeBtn: any;
  @Output() reload = new EventEmitter();

  public fornecedoresUsuais: any = [{}];
  public fornecedores: any = [];
  fornecedorArray: any;
  suprimentoId: number;

  constructor(private suprimentoService: SuprimentoService) {}

  ngOnInit(): void {}

  loadForm(suprimentoInput: any) {
    this.suprimentoId = suprimentoInput.id;
    this.suprimentoForm = new FormGroup({
      nome: new FormControl(suprimentoInput.nome, Validators.required),
      codigo: new FormControl(suprimentoInput.codigo, Validators.required),
      categoria: new FormControl(
        suprimentoInput.categoria,
        Validators.required
      ),
      descricao: new FormControl(
        suprimentoInput.descricao,
        Validators.required
      ),
      quantidade: new FormControl(
        suprimentoInput.quantidade,
        Validators.required
      ),
      precoCusto: new FormControl(
        suprimentoInput.precoCusto,
        Validators.required
      ),
      estoqueAtual: new FormControl(
        suprimentoInput.estoqueAtual,
        Validators.required
      ),
      estoqueMin: new FormControl(
        suprimentoInput.estoqueMin,
        Validators.required
      ),
    });
  }
  save(): void | Promise<SweetAlertResult<any>> {
    if (this.suprimentoForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos obrigatórios!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    this.suprimentoService
      .update(this.suprimentoId, this.suprimentoForm.value)
      .subscribe(() => {
        // this.closeBtn.nativeElement.click();
        return Swal.fire({
          title: 'suprimento salvo!',
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
