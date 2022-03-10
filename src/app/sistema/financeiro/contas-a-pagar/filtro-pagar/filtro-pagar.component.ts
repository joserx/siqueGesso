import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro-pagar',
  templateUrl: './filtro-pagar.component.html',
  styleUrls: ['./filtro-pagar.component.scss']
})
export class FiltroPagarComponent implements OnInit {

pagamentos : any = []

  constructor() { }

  ngOnInit(): void {
  }

  filtrarTipo(event:any){

  }

  filtrarUnidade(event:any){

  }

  deletePagamento(pagamento:any){

  }

}
