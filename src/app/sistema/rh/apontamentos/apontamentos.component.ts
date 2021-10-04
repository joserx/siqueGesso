import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apontamentos',
  templateUrl: './apontamentos.component.html',
  styleUrls: ['./apontamentos.component.scss']
})
export class ApontamentosComponent implements OnInit {

  public cards = [
    { nome: "Faltas", icon: "bi bi-list-ol", href: "/sistema/rh/faltas" },
    { nome: "Ausência", icon: "bi bi-person-lines-fill", href: "/sistema/rh/ausencia" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
