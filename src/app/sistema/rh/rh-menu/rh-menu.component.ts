import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rh-menu',
  templateUrl: './rh-menu.component.html',
  styleUrls: ['./rh-menu.component.scss']
})
export class RhMenuComponent implements OnInit {
  
  public cards = [
    { nome: "Adicionar Colaboradores", icon: "bi-person-circle", href: "/sistema/rh/listar" },
    { nome: "Apontamentos", icon: "bi-card-checklist", href: "/sistema/rh/apontamentos" },
    { nome: "Controle VT", icon: "fas fa-bus", href: "/sistema/rh/controle" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
