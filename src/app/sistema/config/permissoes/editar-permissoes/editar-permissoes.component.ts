import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editar-permissoes',
  templateUrl: './editar-permissoes.component.html',
  styleUrls: ['./editar-permissoes.component.scss']
})
export class EditarPermissoesComponent implements OnInit {

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
