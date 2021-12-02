import { Component, OnInit, ViewChild } from '@angular/core';
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
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    unit_metrics: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    cust_price: new FormControl('', Validators.required),
    current_storage: new FormControl(Validators.required),
    minimum_storage: new FormControl(Validators.required),
  });

  @ViewChild('close') closeBtn: any;

  constructor(private suprimentoService: SuprimentoService) {}

  ngOnInit(): void {}

  loadForm(suprimentoInput: any) {
    this.suprimentoForm = new FormGroup({
      id: new FormControl(suprimentoInput.id, Validators.required),
      name: new FormControl(suprimentoInput.name, Validators.required),
      code: new FormControl(suprimentoInput.code, Validators.required),
      category: new FormControl(suprimentoInput.category, Validators.required),
      description: new FormControl(
        suprimentoInput.description,
        Validators.required
      ),
      unit_metrics: new FormControl(
        suprimentoInput.unit_metrics,
        Validators.required
      ),
      quantity: new FormControl(suprimentoInput.quantity, Validators.required),
      cust_price: new FormControl(
        suprimentoInput.cust_price,
        Validators.required
      ),
      current_storage: new FormControl(
        suprimentoInput.current_storage,
        Validators.required
      ),
      minimum_storage: new FormControl(
        suprimentoInput.minimum_storage,
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
    this.suprimentoService.create(this.suprimentoForm.value).subscribe(() => {
      this.closeBtn.nativeElement.click();
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
