import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-suprimento',
  templateUrl: './view-suprimento.component.html',
  styleUrls: ['./view-suprimento.component.scss'],
})
export class ViewSuprimentoComponent implements OnInit {
  suprimentoForm: FormGroup = new FormGroup({
    name: new FormControl({ value: '', disabled: true }, Validators.required),
    code: new FormControl({ value: '', disabled: true }, Validators.required),
    category: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    description: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    unit_metrics: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    quantity: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    cust_price: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    current_storage: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    minimum_storage: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  constructor() {}

  ngOnInit(): void {}

  loadForm(suprimentoInput: any) {
    this.suprimentoForm = new FormGroup({
      name: new FormControl(
        { value: suprimentoInput.name, disabled: true },
        Validators.required
      ),
      code: new FormControl(
        { value: suprimentoInput.code, disabled: true },
        Validators.required
      ),
      category: new FormControl(
        { value: suprimentoInput.category, disabled: true },
        Validators.required
      ),
      description: new FormControl(
        { value: suprimentoInput.description, disabled: true },
        Validators.required
      ),
      unit_metrics: new FormControl(
        { value: suprimentoInput.unit_metrics, disabled: true },
        Validators.required
      ),
      quantity: new FormControl(
        { value: suprimentoInput.quantity, disabled: true },
        Validators.required
      ),
      cust_price: new FormControl(
        { value: suprimentoInput.cust_price, disabled: true },
        Validators.required
      ),
      current_storage: new FormControl(
        { value: suprimentoInput.current_storage, disabled: true },
        Validators.required
      ),
      minimum_storage: new FormControl(
        { value: suprimentoInput.minimum_storage, disabled: true },
        Validators.required
      ),
    });
  }
}
