import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-fornecedores',
  templateUrl: './adicionar-fornecedores.component.html',
  styleUrls: ['./adicionar-fornecedores.component.scss']
})
export class AdicionarFornecedoresComponent implements OnInit {

  public contatos: any = [{}];

  constructor() { }

  ngOnInit(): void {
  }

  public adicionarContato(): void {
    this.contatos.push({});
  }

}
