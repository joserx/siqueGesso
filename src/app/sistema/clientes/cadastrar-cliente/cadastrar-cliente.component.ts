import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.scss']
})
export class CadastrarClienteComponent implements OnInit {

  public desativadoCheckbox: boolean = false;
  public tipoPessoa: string = 'fisica';

  constructor() { }

  ngOnInit(): void {
  }

  public toggleDesativadoCheckbox(): void {
    this.desativadoCheckbox === true ? this.desativadoCheckbox = false : this.desativadoCheckbox = true;
  }

  public toggleTipoPessoa(value: string): void {
    this.tipoPessoa = value;
  }

}
