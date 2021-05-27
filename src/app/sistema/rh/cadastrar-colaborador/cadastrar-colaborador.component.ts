import { Component, OnInit } from '@angular/core';
import { getDate } from '../../../../environments/global';

@Component({
  selector: 'app-cadastrar-colaborador',
  templateUrl: './cadastrar-colaborador.component.html',
  styleUrls: ['./cadastrar-colaborador.component.scss']
})
export class CadastrarColaboradorComponent implements OnInit {

  public getDate: any = getDate;

  public avatar: string = './assets/sem-foto.jpg';
  public desativadoCheckbox: boolean = false;

  constructor() { }

  ngOnInit(): void {    
  }

  public toggleDesativadoCheckbox(): void {
    this.desativadoCheckbox === true ? this.desativadoCheckbox = false : this.desativadoCheckbox = true;
  }

  public log(e: any):void {
    // console.log(e);    
  }

}
