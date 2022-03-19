import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { ContasPagarService } from 'src/app/services/contas-pagar.service';
import { ContasReceberService } from 'src/app/services/contas-receber.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
@Component({
  selector: 'app-fluxo-de-caixa',
  templateUrl: './fluxo-de-caixa.component.html',
  styleUrls: ['./fluxo-de-caixa.component.scss'],
})
export class FluxoDeCaixaComponent implements OnInit {
  vts: any = [];
  workbook = new Workbook();
  worksheet = this.workbook.addWorksheet('Employee Data');
  header = [
    'Cod',
    'Descrição',
    'Cliente',
    'Pagamento',
    'Data',
    'Total',
    'Situação',
    'Unidade',
  ];
  headerRow = this.worksheet.addRow(this.header);
  fname = 'contas-a-receber';

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
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.financeiro_ver) == PermissionsUsers.financeiro_ver)){
      this.router.navigate(['sistema'])
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

  exportexcel(): void {
    this.worksheet.getRow(1).font = {
      size: 20,
      bold: true,
      color: { argb: 'FFFFFF' },
    };
    this.worksheet.getCell('A1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF6060' },
    };
    this.worksheet.getCell('B1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF6060' },
    };
    this.worksheet.getCell('C1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF6060' },
    };
    this.worksheet.getCell('D1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF6060' },
    };
    this.worksheet.getCell('E1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF6060' },
    };
    this.worksheet.getCell('F1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF6060' },
    };
    this.worksheet.getCell('G1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF6060' },
    };
    this.worksheet.getCell('H1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF6060' },
    };
    this.worksheet.getColumn('A').width = 50;
    for (let x1 of this.vts) {
      let x2: any = Object.keys(x1);
      var temp: any = [];
      console.log(temp);
      for (let y of x2) {
        temp.push(x1[y]);
      }
      this.worksheet.addRow(temp);
    }
    this.vts = [];
    this.workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, this.fname + '-' + new Date().valueOf() + '.csv');
    });
  }
}
