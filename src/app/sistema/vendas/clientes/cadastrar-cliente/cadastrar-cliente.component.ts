import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { getDate } from 'src/environments/global';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.scss']
})
export class CadastrarClienteComponent implements OnInit {

  public getDate: any = getDate;
  public desativadoCheckbox: boolean = false;
  public tipoPessoa: string = 'fisica';
  clienteForm : FormGroup = new FormGroup({
    'name' : new FormControl(null),
    'surname' : new FormControl(null),
    'cpf' : new FormControl(null),
    'rg' : new FormControl(null),
    'cellphone' : new FormControl(null),
    'telephone' : new FormControl(null),
    'birthDate' : new FormControl(null),
    'subcription' : new FormControl(null),
    'socialReason' : new FormControl(null),
    'fantasyName' : new FormControl(null),
    'ramal' : new FormControl(null),
    'email' : new FormControl(null),
  })
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
