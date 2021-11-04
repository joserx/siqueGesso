import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';

@Component({
  selector: 'app-consulta-status',
  templateUrl: './consulta-status.component.html',
  styleUrls: ['./consulta-status.component.scss']
})
export class ConsultaStatusComponent implements OnInit {

  public solicitacoes: any[] = []
  public solicitacoesOriginal: any[] = []

  constructor(
    private readonly solicitacaoService: SolicitacaoService
  ) { }

  ngOnInit(): void {
    this.solicitacaoService.find().subscribe((data:any)=>{
      this.solicitacoes = data
      this.solicitacoesOriginal = data
    })
  }

  filterBeforeNumero = "";
  filtrarNumero(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeNumero.length) {
        this.solicitacoes = this.solicitacoesOriginal.filter((user : any) => `${user.numero}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeNumero = str
      } else {
        this.solicitacoes = this.solicitacoesOriginal;
        this.solicitacoes = this.solicitacoesOriginal.filter((user : any) => `${user.numero}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeNumero = str
      }
    } else {
      this.solicitacoes = this.solicitacoesOriginal;
    }
  }

  filterBeforeVendor = "";
  filtrarVendor(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBeforeVendor.length) {
        this.solicitacoes = this.solicitacoesOriginal.filter((user : any) => `${user.vendedor}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeVendor = str
      } else {
        this.solicitacoes = this.solicitacoesOriginal;
        this.solicitacoes = this.solicitacoesOriginal.filter((user : any) => `${user.vendedor}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBeforeVendor = str
      }
    } else {
      this.solicitacoes = this.solicitacoesOriginal;
    }
  }

}
