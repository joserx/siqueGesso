import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { FornecedorService } from 'src/app/services/fornecedores.service';
import { SuprimentoService } from 'src/app/services/suprimentos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adicionar-suprimentos',
  templateUrl: './adicionar-suprimentos.component.html',
  styleUrls: ['./adicionar-suprimentos.component.scss'],
})
export class AdicionarSuprimentosComponent implements OnInit {
  suprimentoAddForm: FormGroup = new FormGroup({
    fornecedores: new FormArray([
      new FormGroup({
        id: new FormControl(null),
      }),
    ]),
    nome: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    quantidade: new FormControl('', Validators.required),
    precoCusto: new FormControl('', Validators.required),
    estoqueAtual: new FormControl('', Validators.required),
    estoqueMin: new FormControl('', Validators.required),
  });
  @ViewChild('close') closeBtn: any;
  @Output() reload = new EventEmitter();

  public fornecedoresUsuais: any = [{}];
  public fornecedores: any = [];

  constructor(
    private fornecedorService: FornecedorService,
    private suprimentoService: SuprimentoService
  ) {}

  ngOnInit(): void {
    if (!this.fornecedorService.fornecedores)
      this.fornecedorService.find().subscribe((res) => {
        this.fornecedorService.fornecedores = res;
        this.fornecedores = res;
      });
    else this.fornecedores = this.fornecedorService.fornecedores;
  }

  get fornecedorArray() {
    return this.suprimentoAddForm.get('fornecedores')! as FormArray;
  }

  getFornecedores() {
    this.fornecedorService.find().subscribe((res) => {
      this.fornecedorService.fornecedores = res;
      this.fornecedores = res;
      console.log(this.fornecedores);
    });
  }

  submit(): any {
    console.log(this.suprimentoAddForm);
    if (this.suprimentoAddForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos corretamente!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    this.suprimentoService
      .create(this.suprimentoAddForm.value)
      .subscribe(() => {
        this.reload.emit();
        // this.closeBtn.nativeElement.click();
        this.suprimentoAddForm.reset();
        return Swal.fire({
          title: 'Produto salvo!',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  }

  public adicionarFornecedorUsual(): any {
    this.fornecedoresUsuais.push({});
  }
}
