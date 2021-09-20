import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedorService } from 'src/app/services/fornecedores.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { BrazilValidator } from '../../../../_helpers/brasil';

@Component({
  selector: 'app-adicionar-fornecedores',
  templateUrl: './adicionar-fornecedores.component.html',
  styleUrls: ['./adicionar-fornecedores.component.scss']
})
export class AdicionarFornecedoresComponent implements OnInit {

  public contatos: any = [{}];
  fornecedorForm: FormGroup = new FormGroup({
    category: new FormControl('', Validators.required),
    cnpj: new FormControl('', [Validators.required, BrazilValidator.isValidCNPJ]),
    fantasy_name: new FormControl('', Validators.required),
    social_reason: new FormControl('', Validators.required),
    tribute_code: new FormControl('', Validators.required),
    contribuinte: new FormControl('', Validators.required),
    state_registration: new FormControl('', Validators.required),
    is_exempt: new FormControl(false, Validators.required),
    municipal_registration: new FormControl('', Validators.required),
    address: new FormGroup({
      cep: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      complement: new FormControl(''),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('Brasil', Validators.required)
    }),
    contacts: new FormArray([new FormGroup({
      name: new FormControl('', Validators.required),
      whatsApp: new FormControl('', Validators.required),
      tel_1: new FormControl('', Validators.required),
      ramal_1: new FormControl('', Validators.required),
      tel_2: new FormControl('', Validators.required),
      ramal_2: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      email_nf: new FormControl('', [Validators.required, Validators.email]),
      site: new FormControl('', Validators.required),
    })]),
    payment_condition: new FormControl(),
    first_payment: new FormControl('', Validators.required),
    last_payment: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required)
  })

  constructor(
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {
  }

  public adicionarContato(): void {
    this.c.push(new FormGroup({
      name: new FormControl('', Validators.required),
      whatsapp: new FormControl('', Validators.required),
      tel_1: new FormControl('', Validators.required),
      ramal_1: new FormControl('', Validators.required),
      tel_2: new FormControl('', Validators.required),
      ramal_2: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      email_nf: new FormControl('', [Validators.required, Validators.email]),
      site: new FormControl('', Validators.required),
    }))
  }
  removeContato(i: number){ this.c.removeAt(i) }

  get c(){ return this.fornecedorForm.get('contacts') as FormArray }
  get a(){ return this.fornecedorForm.get('address') as FormGroup }

  save(): void | Promise<SweetAlertResult<any>>{
    console.log(this.fornecedorForm)
    if (this.fornecedorForm.invalid) return Swal.fire({ title: 'Preencha todos os campos obrigatórios!', icon: 'error', toast: true, position: 'top', showConfirmButton: false, timer: 3000, timerProgressBar: true })
    this.fornecedorService.create(this.fornecedorForm.value).subscribe(() => {
      return Swal.fire({ title: 'Forncedor salvo!', icon: 'success', toast: true, position: 'top', showConfirmButton: false, timer: 3000, timerProgressBar: true })
    })
  }

  loadCep(cep: any) {
    cep = cep.value
    if (cep.length == 9) {
      this.fornecedorService.updateCep(cep.replace(/-/g, "")).subscribe((data: any) => {
        this.a.get('street')!.setValue(data.logradouro)
        this.a.get('state')!.setValue(data.uf)
        this.a.get('city')!.setValue(data.localidade)
        this.a.get('neighborhood')!.setValue(data.bairro)
      })
    }
  }

}
