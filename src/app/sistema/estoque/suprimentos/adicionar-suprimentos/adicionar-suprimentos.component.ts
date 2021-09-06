import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adicionar-suprimentos',
  templateUrl: './adicionar-suprimentos.component.html',
  styleUrls: ['./adicionar-suprimentos.component.scss']
})
export class AdicionarSuprimentosComponent implements OnInit {

  public supForm: FormGroup = new FormGroup({

  })

  public fornecedoresUsuais: any = [{}];

  constructor() { }

  ngOnInit(): void {
  }

  submitSupForm(value: any){
    alert("teste")
  }

  public adicionarFornecedorUsual(): any {
    this.fornecedoresUsuais.push({});
  }

}
