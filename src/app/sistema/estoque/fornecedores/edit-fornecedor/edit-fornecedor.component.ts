import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedorService } from 'src/app/services/fornecedores.service';
import { BrazilValidator } from 'src/app/_helpers/brasil';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-edit-fornecedor',
  templateUrl: './edit-fornecedor.component.html',
  styleUrls: ['./edit-fornecedor.component.scss'],
})
export class EditFornecedorComponent implements OnInit {
  public paymentCondition: any = [];

  fornecedorForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    cnpj: new FormControl('', [
      Validators.required,
      BrazilValidator.isValidCNPJ(),
    ]),
    fantasy_name: new FormControl('', Validators.required),
    social_reason: new FormControl('', Validators.required),
    tribute_code: new FormControl('', Validators.required),
    contribuinte: new FormControl('', Validators.required),
    state_registration: new FormControl('', Validators.required),
    is_exempt: new FormControl(false, Validators.required),
    address: new FormGroup({
      id: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      complement: new FormControl(''),
      neighborhood: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('Brasil', Validators.required),
    }),
    contacts: new FormArray([
      new FormGroup({
        id: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        whatsApp: new FormControl('', Validators.required),
        tel_1: new FormControl('', Validators.required),
        ramal_1: new FormControl('', Validators.required),
        tel_2: new FormControl('', Validators.required),
        ramal_2: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        email_nf: new FormControl('', [Validators.required, Validators.email]),
        site: new FormControl('', Validators.required),
      }),
    ]),
    payment_condition: new FormControl(),
    first_payment: new FormControl('', Validators.required),
    last_payment: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
  });

  @ViewChild('close') closeBtn: any;
  @Output() reload = new EventEmitter();

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {}

  checkPayment(id: any) {
    this.paymentCondition.forEach((item: any) => {
      if (item.id === id) {
        item.check = true;
      }
    });
  }

  loadForm(fornecedorInput: any) {
    console.log(fornecedorInput);
    this.fornecedorForm = new FormGroup({
      id: new FormControl(fornecedorInput.id, Validators.required),
      category: new FormControl(fornecedorInput.category, Validators.required),
      cnpj: new FormControl(fornecedorInput.cnpj, [
        Validators.required,
        BrazilValidator.isValidCNPJ(),
      ]),
      fantasy_name: new FormControl(
        fornecedorInput.fantasy_name,
        Validators.required
      ),
      social_reason: new FormControl(
        fornecedorInput.social_reason,
        Validators.required
      ),
      tribute_code: new FormControl(
        fornecedorInput.tribute_code,
        Validators.required
      ),
      contribuinte: new FormControl(
        fornecedorInput.contribuinte,
        Validators.required
      ),
      state_registration: new FormControl(
        fornecedorInput.state_registration,
        Validators.required
      ),
      is_exempt: new FormControl(
        fornecedorInput.is_exempt,
        Validators.required
      ),

      address: new FormGroup({
        id: new FormControl(fornecedorInput.address.id, Validators.required),
        cep: new FormControl(fornecedorInput.address.cep, Validators.required),
        street: new FormControl(
          fornecedorInput.address.street,
          Validators.required
        ),
        number: new FormControl(
          fornecedorInput.address.number,
          Validators.required
        ),
        complement: new FormControl(fornecedorInput.address.complement),
        neighborhood: new FormControl(
          fornecedorInput.address.neighborhood,
          Validators.required
        ),
        city: new FormControl(
          fornecedorInput.address.city,
          Validators.required
        ),
        state: new FormControl(
          fornecedorInput.address.state,
          Validators.required
        ),
      }),
      contacts: new FormArray([]),
      payment_condition: new FormControl(fornecedorInput.payment_condition),
      first_payment: new FormControl(
        fornecedorInput.first_payment,
        Validators.required
      ),
      last_payment: new FormControl(
        fornecedorInput.last_payment,
        Validators.required
      ),
      notes: new FormControl(fornecedorInput.notes, Validators.required),
    });
    for (let fornecedor of fornecedorInput.contacts) {
      this.c.push(
        new FormGroup({
          id: new FormControl(fornecedor.id, Validators.required),
          name: new FormControl(fornecedor.name, Validators.required),
          whatsApp: new FormControl(fornecedor.whatsApp, Validators.required),
          tel_1: new FormControl(fornecedor.tel_1, Validators.required),
          ramal_1: new FormControl(fornecedor.ramal_1, Validators.required),
          tel_2: new FormControl(fornecedor.tel_2, Validators.required),
          ramal_2: new FormControl(fornecedor.ramal_2, Validators.required),
          email: new FormControl(fornecedor.email, [
            Validators.required,
            Validators.email,
          ]),
          email_nf: new FormControl(fornecedor.email_nf, [
            Validators.required,
            Validators.email,
          ]),
          site: new FormControl(fornecedor.site, Validators.required),
        })
      );
    }
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

  save(): void | Promise<SweetAlertResult<any>> {
    if (this.fornecedorForm.invalid)
      return Swal.fire({
        title: 'Preencha todos os campos obrigatórios!',
        icon: 'error',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    this.fornecedorService.create(this.fornecedorForm.value).subscribe(() => {
      this.closeBtn.nativeElement.click();
      this.reload.emit();
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
}
