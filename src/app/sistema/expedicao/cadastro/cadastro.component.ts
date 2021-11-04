import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public cards = [
    { nome: "Motorista", icon: "bi-person-circle", href: "//sistema/expedicao/cadastro/motorista" },
    { nome: "Veículo", icon: "bi-truck", href: "//sistema/expedicao/cadastro/veiculo" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
