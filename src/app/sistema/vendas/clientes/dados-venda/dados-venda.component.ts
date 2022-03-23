import { Component, OnInit } from '@angular/core';
import { CondicoesPagamentoService } from 'src/app/services/condicoes-pagamento.service';

@Component({
  selector: 'app-dados-venda',
  templateUrl: './dados-venda.component.html',
  styleUrls: ['./dados-venda.component.scss']
})
export class DadosVendaComponent implements OnInit {
  public paymentCondition: any = [];
  public condicoesPagamento: any = [];
  public tipoUsuario = 1;

  constructor(private condicoesPagamentoService: CondicoesPagamentoService) { }

  ngOnInit(): void {
    this.getCondicoes();

  }

  checkPayment(id: any) {
    this.paymentCondition.forEach((item: any) => {
      if (item.id === id) {
        item.check = true;
      }
    });
  }

  getCondicoes() {
    this.condicoesPagamentoService.findAll().subscribe((res) => {
      this.paymentCondition = res;
    });
  }

}
