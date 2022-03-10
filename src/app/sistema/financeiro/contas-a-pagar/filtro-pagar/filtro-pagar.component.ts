import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContasPagarService } from 'src/app/services/contas-pagar.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-filtro-pagar',
  templateUrl: './filtro-pagar.component.html',
  styleUrls: ['./filtro-pagar.component.scss'],
})
export class FiltroPagarComponent implements OnInit {
  @Input() contas: Array<any> = [];
  public conta: any;

  @Input() contasOriginal: Array<any> = [];
  @Output() contasFiltradas = new EventEmitter<any>();

  constructor(private contasPagarService: ContasPagarService) {}

  ngOnInit(): void {
    this.getContas();
  }

  getContas() {
    this.contasPagarService.find().subscribe((res) => {
      this.contasPagarService.contas = res;
      this.contas = res;
    });
  }

  filtrarTipo(event: any) {
    const formaPagamento = event.target.value;
    if (formaPagamento) {
      this.contas = this.contasOriginal.filter(
        (conta) => conta.formaPagamento == formaPagamento
      );
    } else {
      this.contas = this.contasOriginal;
    }
  }

  filtrarUnidade(event: any) {
    const unidade = event.target.value;
    if (unidade) {
      this.contas = this.contasOriginal.filter(
        (conta) => conta.unidade == unidade
      );
    } else {
      this.contas = this.contasOriginal;
    }
  }

  deletePagamento(pagamento: any) {}
}
