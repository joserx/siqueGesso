import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from 'src/app/services/solicitacao.service';

@Component({
  selector: 'app-consulta-status',
  templateUrl: './consulta-status.component.html',
  styleUrls: ['./consulta-status.component.scss']
})
export class ConsultaStatusComponent implements OnInit {

  public solicitacoes: any[] = []

  constructor(
    private readonly solicitacaoService: SolicitacaoService
  ) { }

  ngOnInit(): void {
    this.solicitacaoService.find().subscribe((data:any)=>{
      this.solicitacoes = data
    })
  }

}
