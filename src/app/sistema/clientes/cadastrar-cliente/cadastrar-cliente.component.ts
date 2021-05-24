import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.scss']
})
export class CadastrarClienteComponent implements OnInit {

  public desativadoCheckbox: boolean = false;
  public tipoPessoa: string = 'fisica';

  public enderecos: any = [{}];

  constructor() { }

  ngOnInit(): void {
  }

  public adicionarEndereco(): void {
    this.enderecos.push({});
  }

  public removerEndereco(id: number): void {
    (this.enderecos).pop(id)
    console.log(this.enderecos);
    
  }

  public toggleDesativadoCheckbox(): void {
    this.desativadoCheckbox === true ? this.desativadoCheckbox = false : this.desativadoCheckbox = true;
  }

  public toggleTipoPessoa(value: string): void {
    this.tipoPessoa = value;
  }

}
