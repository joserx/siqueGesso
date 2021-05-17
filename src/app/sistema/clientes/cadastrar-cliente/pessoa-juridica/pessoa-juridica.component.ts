import { Component, OnInit } from '@angular/core';
import { getDate } from '../../../../../environments/global';

@Component({
  selector: 'app-pessoa-juridica',
  templateUrl: './pessoa-juridica.component.html',
  styleUrls: ['./pessoa-juridica.component.scss']
})
export class PessoaJuridicaComponent implements OnInit {

  public getDate: any = getDate;
  
  constructor() { }

  ngOnInit(): void {
  }

}
