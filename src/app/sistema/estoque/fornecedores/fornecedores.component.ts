import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})
export class FornecedoresComponent implements OnInit {

  public fornecedores: any = [
    { id: 1, nome: "Finger Digital", telefone: "11 9 9999-9999", email: "michael.jordan@siquegesso.com"},
    { id: 2, nome: "Finger Digital", telefone: "11 9 9999-9999", email: "ricardo.botega@siquegesso.com"},
    { id: 3, nome: "Finger Digital", telefone: "11 9 9999-9999", email: "deise.teixeira@siquegesso.com"},
    { id: 4, nome: "Finger Digital", telefone: "11 9 9999-9999", email: "thais.camila@siquegesso.com"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
