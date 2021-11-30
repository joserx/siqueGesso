import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-view-suprimento',
  templateUrl: './view-suprimento.component.html',
  styleUrls: ['./view-suprimento.component.scss']
})
export class ViewSuprimentoComponent implements OnInit {
suprimentoForm: FormGroup = new FormGroup ({


  name: new FormControl({ value: '', disabled: true }, Validators.required),
  code: new FormControl({ value: '', disabled: true }, Validators.required),
  category: new FormControl({ value: '', disabled: true }, Validators.required),
  description: new FormControl({ value: '', disabled: true }, Validators.required),
  unit_metrics: new FormControl({ value: '', disabled: true }, Validators.required),
  quantity: new FormControl({ value: '', disabled: true }, Validators.required),
  cust_price: new FormControl({ value: '', disabled: true }, Validators.required),
  current_storage: new FormControl({ value: '', disabled: true }, Validators.required),
  minimum_storage: new FormControl({ value: '', disabled: true }, Validators.required),
})
  

  constructor() { }

  ngOnInit(): void {
  }

loadForm(fornecedorInput: any){
    this.suprimentoForm = new FormGroup({
      name: new FormControl({ value: fornecedorInput.name, disabled: true }, Validators.required),
      code: new FormControl({ value: fornecedorInput.code, disabled: true }, Validators.required),
      category: new FormControl({ value: fornecedorInput.category, disabled: true }, Validators.required),
      description: new FormControl({ value: fornecedorInput.description, disabled: true }, Validators.required),
      unit_metrics: new FormControl({ value: fornecedorInput.unit_metrics, disabled: true }, Validators.required),
      quantity: new FormControl({ value: fornecedorInput.quantity, disabled: true }, Validators.required),
      cust_price: new FormControl({ value: fornecedorInput.cust_price, disabled: true }, Validators.required),
      current_storage: new FormControl({ value: fornecedorInput.current_storage, disabled: true }, Validators.required),
      minimum_storage: new FormControl({ value: fornecedorInput.minimum_storage, disabled: true }, Validators.required),
    })
  }
}
    
