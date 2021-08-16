import { Component, OnInit } from '@angular/core';
import { getDate } from '../../../../../environments/global';

@Component({
  selector: 'app-editar-avaliacao-credito',
  templateUrl: './avaliacao-credito.component.html',
  styleUrls: ['./avaliacao-credito.component.scss']
})
export class EditarAvaliacaoCreditoComponent implements OnInit {

  public getDate: any = getDate;

  constructor() { }

  ngOnInit(): void {
  }

}
