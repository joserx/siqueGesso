import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedorService } from 'src/app/services/fornecedores.service';

@Component({
  selector: 'app-adicionar-suprimentos',
  templateUrl: './adicionar-suprimentos.component.html',
  styleUrls: ['./adicionar-suprimentos.component.scss'],
})
export class AdicionarSuprimentosComponent implements OnInit {
  suprimentoForm: FormGroup = new FormGroup({
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

  public fornecedoresUsuais: any = [{}];
  public fornecedores: any = [];

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    this.getFornecedores();
  }

  getFornecedores() {
    this.fornecedorService.find().subscribe((res) => {
      this.fornecedorService.fornecedores = res;
      this.fornecedores = res;
      console.log(this.fornecedores);
    });
  }

  submitSupForm(value: any) {
    alert('teste');
  }

  public adicionarFornecedorUsual(): any {
    this.fornecedoresUsuais.push({});
  }
}
