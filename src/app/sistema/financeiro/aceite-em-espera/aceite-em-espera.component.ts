import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aceite-em-espera',
  templateUrl: './aceite-em-espera.component.html',
  styleUrls: ['./aceite-em-espera.component.scss']
})
export class AceiteEmEsperaComponent implements OnInit {
  public pedidosFiltrados: any = [];


  constructor() { }

  ngOnInit(): void {
  }

}
