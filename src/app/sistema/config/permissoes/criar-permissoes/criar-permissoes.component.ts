import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-criar-permissoes',
  templateUrl: './criar-permissoes.component.html',
  styleUrls: ['./criar-permissoes.component.scss']
})
export class CriarPermissoesComponent implements OnInit {

  @ViewChild('opt') opt: ElementRef;
  areas: any = [
    {
      name: 'VENDER'
    },
    {
      name: 'COMPRAS'
    },
    {
      name: 'ESTOQUE'
    },
    {
      name:'FINANCEIRO'
    },
    {
      name: 'EXPEDIÇÃO'
    },
    {
      name: 'RH'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  closeOpt(){
    this.opt.nativeElement.click()
  }

}
