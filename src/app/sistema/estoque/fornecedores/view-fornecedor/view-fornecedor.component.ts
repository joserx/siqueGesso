import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BrazilValidator } from 'src/app/_helpers/brasil';

@Component({
  selector: 'app-view-fornecedor',
  templateUrl: './view-fornecedor.component.html',
  styleUrls: ['./view-fornecedor.component.scss']
})
export class ViewFornecedorComponent implements OnInit {

  fornecedorForm: FormGroup = new FormGroup({
    category: new FormControl({ value: '', disabled: true }, Validators.required),
    cnpj: new FormControl({ value: '', disabled: true }, [Validators.required, BrazilValidator.isValidCNPJ]),
    fantasy_name: new FormControl({ value: '', disabled: true }, Validators.required),
    social_reason: new FormControl({ value: '', disabled: true }, Validators.required),
    tribute_code: new FormControl({ value: '', disabled: true }, Validators.required),
    contribuinte: new FormControl({ value: '', disabled: true }, Validators.required),
    state_registration: new FormControl({ value: '', disabled: true }, Validators.required),
    is_exempt: new FormControl({value: false, disabled: true}, Validators.required),
    municipal_registration: new FormControl({ value: '', disabled: true }, Validators.required),
    address: new FormGroup({
      cep: new FormControl({ value: '', disabled: true }, Validators.required),
      street: new FormControl({ value: '', disabled: true }, Validators.required),
      number: new FormControl({ value: '', disabled: true }, Validators.required),
      complement: new FormControl({ value: '', disabled: true }),
      neighborhood: new FormControl({ value: '', disabled: true }, Validators.required),
      city: new FormControl({ value: '', disabled: true }, Validators.required),
      state: new FormControl({ value: '', disabled: true }, Validators.required),
      country: new FormControl('Brasil', Validators.required)
    }),
    contacts: new FormArray([new FormGroup({
      name: new FormControl({ value: '', disabled: true }, Validators.required),
      whatsApp: new FormControl({ value: '', disabled: true }, Validators.required),
      tel_1: new FormControl({ value: '', disabled: true }, Validators.required),
      ramal_1: new FormControl({ value: '', disabled: true }, Validators.required),
      tel_2: new FormControl({ value: '', disabled: true }, Validators.required),
      ramal_2: new FormControl({ value: '', disabled: true }, Validators.required),
      email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
      email_nf: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
      site: new FormControl({ value: '', disabled: true }, Validators.required),
    })]),
    payment_condition: new FormControl(),
    first_payment: new FormControl({ value: '', disabled: true }, Validators.required),
    last_payment: new FormControl({ value: '', disabled: true }, Validators.required),
    notes: new FormControl({ value: '', disabled: true }, Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }

  loadForm(fornecedorInput: any){
    this.fornecedorForm = new FormGroup({
      category: new FormControl({ value: fornecedorInput.category, disabled: true }, Validators.required),
      cnpj: new FormControl({ value: fornecedorInput.cnpj, disabled: true }, [Validators.required, BrazilValidator.isValidCNPJ]),
      fantasy_name: new FormControl({ value: fornecedorInput.fantasy_name, disabled: true }, Validators.required),
      social_reason: new FormControl({ value: fornecedorInput.social_reason, disabled: true }, Validators.required),
      tribute_code: new FormControl({ value: fornecedorInput.tribute_code, disabled: true }, Validators.required),
      contribuinte: new FormControl({ value: fornecedorInput.contribuinte, disabled: true }, Validators.required),
      state_registration: new FormControl({ value: fornecedorInput.state_registration, disabled: true }, Validators.required),
      is_exempt: new FormControl({ value: fornecedorInput.is_exempt, disabled: true }, Validators.required),
      municipal_registration: new FormControl({ value: fornecedorInput.municipal_registration, disabled: true }, Validators.required),
      address: new FormGroup({
        cep: new FormControl({ value: fornecedorInput.address.cep, disabled: true }, Validators.required),
        street: new FormControl({ value: fornecedorInput.address.street, disabled: true }, Validators.required),
        number: new FormControl({ value: fornecedorInput.address.number, disabled: true }, Validators.required),
        complement: new FormControl({ value: fornecedorInput.address.complement, disabled: true }),
        neighborhood: new FormControl({ value: fornecedorInput.address.neighborhood, disabled: true }, Validators.required),
        city: new FormControl({ value: fornecedorInput.address.city, disabled: true }, Validators.required),
        state: new FormControl({ value: fornecedorInput.address.state, disabled: true }, Validators.required)
      }),
      contacts: new FormArray([]),
      payment_condition: new FormControl(),
      first_payment: new FormControl({ value: fornecedorInput.first_payment, disabled: true }, Validators.required),
      last_payment: new FormControl({ value: fornecedorInput.last_payment, disabled: true }, Validators.required),
      notes: new FormControl({ value: fornecedorInput.notes, disabled: true }, Validators.required)
    })
    for (let fornecedor of fornecedorInput.contacts){
      this.c.push(new FormGroup({
        name: new FormControl({ value: fornecedor.name, disabled: true }, Validators.required),
        whatsApp: new FormControl({ value: fornecedor.whatsApp, disabled: true }, Validators.required),
        tel_1: new FormControl({ value: fornecedor.tel_1, disabled: true }, Validators.required),
        ramal_1: new FormControl({ value: fornecedor.ramal_1, disabled: true }, Validators.required),
        tel_2: new FormControl({ value: fornecedor.tel_2, disabled: true }, Validators.required),
        ramal_2: new FormControl({ value: fornecedor.ramal_2, disabled: true }, Validators.required),
        email: new FormControl({ value: fornecedor.email, disabled: true }, [Validators.required, Validators.email]),
        email_nf: new FormControl({ value: fornecedor.email_nf, disabled: true }, [Validators.required, Validators.email]),
        site: new FormControl({ value: fornecedor.site, disabled: true }, Validators.required),
      }))
    }
  }

  get c(){ return this.fornecedorForm.get('contacts') as FormArray }
  get a(){ return this.fornecedorForm.get('address') as FormGroup }

}
