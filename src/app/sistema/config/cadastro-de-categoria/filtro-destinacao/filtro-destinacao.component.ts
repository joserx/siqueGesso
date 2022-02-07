import { Component, OnInit } from '@angular/core';
import { DestinacaoVendaService } from 'src/app/services/destinacao-venda.service';

@Component({
  selector: 'app-filtro-destinacao',
  templateUrl: './filtro-destinacao.component.html',
  styleUrls: ['./filtro-destinacao.component.scss'],
})
export class FiltroDestinacaoComponent implements OnInit {
  public destinacao: any;
  public destinacoes: any;
  public destinacoesFiltradas: any = [];

  constructor(private DestinacaoVendaService: DestinacaoVendaService) {}

  ngOnInit(): void {
    this.getDestinacao();
  }

  getDestinacao() {
    this.DestinacaoVendaService.find().subscribe((res) => {
      this.DestinacaoVendaService.destinacoes = res;
      this.destinacoes = res;
      this.destinacoesFiltradas = this.destinacoes;
      console.log(res);
    });
  }
}
