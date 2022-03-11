import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-visualizar-categoria',
  templateUrl: './visualizar-categoria.component.html',
  styleUrls: ['./visualizar-categoria.component.scss']
})
export class VisualizarCategoriaComponent implements OnInit {

  @ViewChild('opt') opt: ElementRef;
  
  constructor() { }
  areas: any = [
    {
      name: 'VENDAS'
    },
    {
      name: 'COMPRAS '
    },
    {
      name: 'ESTOQUE '
    },
    {
      name:'FINANCEIRO '
    },
    {
      name: 'EXPEDIÇÃO'
    },
    {
      name: 'RH'
    }
  ]
  ngOnInit(): void {
  }

  closeOpt(){
    this.opt.nativeElement.click()
  }

}
