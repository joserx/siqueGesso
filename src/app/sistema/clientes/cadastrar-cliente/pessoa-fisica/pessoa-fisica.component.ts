import { Component, OnInit } from '@angular/core';
import { getDate } from '../../../../../environments/global';

@Component({
  selector: 'app-pessoa-fisica',
  templateUrl: './pessoa-fisica.component.html',
  styleUrls: ['./pessoa-fisica.component.scss']
})
export class PessoaFisicaComponent implements OnInit {

  public getDate: any = getDate;
  
  constructor() { }

  ngOnInit(): void {
  }

}
