import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { ContasPagarService } from 'src/app/services/contas-pagar.service';
import { ContasReceberService } from 'src/app/services/contas-receber.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-fluxo-de-caixa',
  templateUrl: './fluxo-de-caixa.component.html',
  styleUrls: ['./fluxo-de-caixa.component.scss'],
})
export class FluxoDeCaixaComponent implements OnInit {

  recebimentos: any = [];
  contas: any = [];

  totalContas: number = 0;
  totalRecebimentos: number = 0;

  public valor: any;

  constructor(
    private contasPagarService: ContasPagarService,
    private contasReceberService: ContasReceberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      !(
        (JSON.parse(localStorage.getItem('currentUser') as any).result
          .permission.permission &
          PermissionsUsers.financeiro_ver) ==
        PermissionsUsers.financeiro_ver
      )
    ) {
      this.router.navigate(['sistema']);
    }
    this.totalFluxo();
  }

  async getContas() {
    const res = await this.contasPagarService.findPromise();
    this.contasPagarService.contas = res;
    this.contas = res;
    this.totalContas = res.reduce(
      (acc: any, curr: any) => acc + parseFloat(curr.valorTotal),
      0
    );
  }

  async getRecebimentos() {
    const res = await this.contasReceberService.findPromise();
    this.contasReceberService.contas = res;
    this.recebimentos = res;
    this.totalRecebimentos = res.reduce(
      (acc: any, curr: any) => acc + parseFloat(curr.valorTotal),
      0
    );
  }

  async totalFluxo() {
    await Promise.all([this.getContas(), this.getRecebimentos()]);
    this.valor = this.totalRecebimentos - this.totalContas;
  }

  exportExcel(): void {
    const table1 = document.getElementById('excel-table1');
    const table2 = document.getElementById('excel-table2');
    this.buildExcel(table1, 'recebimento.xlsx');
    this.buildExcel(table2, 'pagamento.xlsx');
  }

  buildExcel(element: any, filename: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, filename);
  }
}
