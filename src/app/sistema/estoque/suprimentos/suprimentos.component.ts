import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suprimentos',
  templateUrl: './suprimentos.component.html',
  styleUrls: ['./suprimentos.component.scss']
})
export class SuprimentosComponent implements OnInit {

  public suprimentos: any = [
    { codigo: 1, nome: "Papel higiênico", custo: 10, quantidade: 200},
    { codigo: 2, nome: "Papel higiênico", custo: 10, quantidade: 200},
    { codigo: 3, nome: "Papel higiênico", custo: 10, quantidade: 200},
    { codigo: 4, nome: "Papel higiênico", custo: 10, quantidade: 200},
    { codigo: 5, nome: "Papel higiênico", custo: 10, quantidade: 200},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
