import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewSuprimentoComponent } from './view-suprimento/view-suprimento.component';

@Component({
  selector: 'app-suprimentos',
  templateUrl: './suprimentos.component.html',
  styleUrls: ['./suprimentos.component.scss'],
})
export class SuprimentosComponent implements OnInit {
  @ViewChild(ViewSuprimentoComponent)
  viewSuprimentoComponent: any;

  public suprimentos: any = [
    { codigo: 1, nome: 'Papel higiênico', custo: 10, quantidade: 200 },
    { codigo: 2, nome: 'Papel higiênico', custo: 10, quantidade: 200 },
    { codigo: 3, nome: 'Papel higiênico', custo: 10, quantidade: 200 },
    { codigo: 4, nome: 'Papel higiênico', custo: 10, quantidade: 200 },
    { codigo: 5, nome: 'Papel higiênico', custo: 10, quantidade: 200 },
  ];

  constructor() {}

  ngOnInit(): void {}

  loadSuprimentoView(suprimento: any) {
    this.viewSuprimentoComponent.loadForm(suprimento);
  }
}
