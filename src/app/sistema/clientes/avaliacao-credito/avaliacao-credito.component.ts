import { Component, OnInit } from '@angular/core';
import { getDate } from '../../../../environments/global';

@Component({
  selector: 'app-avaliacao-credito',
  templateUrl: './avaliacao-credito.component.html',
  styleUrls: ['./avaliacao-credito.component.scss']
})
export class AvaliacaoCreditoComponent implements OnInit {

  public getDate: any = getDate;

  constructor() { }

  ngOnInit(): void {
  }

}
