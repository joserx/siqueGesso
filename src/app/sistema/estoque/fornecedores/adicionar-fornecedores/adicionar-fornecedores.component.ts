import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedorService } from 'src/app/services/fornecedores.service';
import { CategoriaFornecedorService } from 'src/app/services/categoria-fornecedor.service';

import Swal, { SweetAlertResult } from 'sweetalert2';

import { BrazilValidator } from '../../../../_helpers/brasil';

@Component({
  selector: 'app-adicionar-fornecedores',
  templateUrl: './adicionar-fornecedores.component.html',
  styleUrls: ['./adicionar-fornecedores.component.scss'],
})
export class AdicionarFornecedoresComponent implements OnInit {
  public categorias: any = [];

  fornecedorForm: FormGroup = new FormGroup({
    category: new FormControl('', Validators.required),
    cnpj: new FormControl('', [
      Validators.required,
      BrazilValidator.isValidCNPJ(),
    ]),
    fantasy_name: new FormControl('', Validators.required),
    social_reason: new FormControl('', Validators.required),
    tribute_code: new FormControl('',),
    contribuinte: new FormControl('', ),
    state_registration: new FormControl('',),
    is_exempt: new FormControl(false),
    minimum_billing: new FormControl('', ),
    address: new FormGroup({
      cep: new FormControl(''),
      street: new FormControl(''),
      number: new FormControl(''),
      complement: new FormControl(''),
      neighborhood: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl('Brasil'),
    }),
    contacts: new FormArray([
      new FormGroup({
        name: new FormControl(''),
        whatsApp: new FormControl(''),
        tel_1: new FormControl(''),
        ramal_1: new FormControl(''),
        tel_2: new FormControl(''),
        ramal_2: new FormControl(''),
        email: new FormControl('', [Validators.email]),
        email_nf: new FormControl('', [Validators.email]),
        site: new FormControl(''),
      }),
    ]),
    payment_condition: new FormControl(),
    first_payment: new FormControl('', Validators.required),
    last_payment: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
  });

  @ViewChild('close') closeBtn: any;
  @Output() reload = new EventEmitter();

  constructor(
    private fornecedorService: FornecedorService,
    private categoriaFornecedorService: CategoriaFornecedorService
  ) {}

  ngOnInit(): void {
    this.getCategorias()
  }

  public adicionarContato(): void {
    this.c.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        whatsapp: new FormControl('', Validators.required),
        tel_1: new FormControl('', Validators.required),
        ramal_1: new FormControl('', Validators.required),
        tel_2: new FormControl('', Validators.required),
        ramal_2: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        email_nf: new FormControl('', [Validators.required, Validators.email]),
        site: new FormControl('', Validators.required),
      })
    );
  }
  removeContato(i: number) {
    this.c.removeAt(i);
  }

  get c() {
    return this.fornecedorForm.get('contacts') as FormArray;
  }
  get a() {
    return this.fornecedorForm.get('address') as FormGroup;
  }

  getCategorias() {
    this.categoriaFornecedorService.find().subscribe((res) => {
      this.categoriaFornecedorService.categorias = res;
      this.categorias = res;

    });
  }

  save(): void | Promise<SweetAlertResult<any>> {
    if (this.fornecedorForm.invalid) {
      for (let item in this.fornecedorForm.controls) {
        if (this.fornecedorForm.controls[item].status == 'INVALID') {
          console.log(item);
        }
      }
      return Swal.fire({
        title: 'Preencha todos os campos obrigatórios!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
    this.fornecedorService.create(this.fornecedorForm.value).subscribe(() => {
      this.reload.emit();
      this.closeBtn.nativeElement.click();
      return Swal.fire({
        title: 'Fornecedor salvo!',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    });
  }

  loadCep(cep: any) {
    cep = cep.value;
    if (cep.length == 9) {
      this.fornecedorService
        .updateCep(cep.replace(/-/g, ''))
        .subscribe((data: any) => {
          this.a.get('street')!.setValue(data.logradouro);
          this.a.get('state')!.setValue(data.uf);
          this.a.get('city')!.setValue(data.localidade);
          this.a.get('neighborhood')!.setValue(data.bairro);
        });
    }
  }
}
