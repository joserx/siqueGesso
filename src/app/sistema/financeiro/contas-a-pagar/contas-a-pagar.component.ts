import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ContasPagarService } from 'src/app/services/contas-pagar.service';
import { EditContasPComponent } from './edit-contas-p/edit-contas-p.component';
import { ViewContasPagarComponent } from './view-contas-pagar/view-contas-pagar.component';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas-a-pagar',
  templateUrl: './contas-a-pagar.component.html',
  styleUrls: ['./contas-a-pagar.component.scss'],
})
export class ContasAPagarComponent implements OnInit {
  vts: any = [];
  workbook = new Workbook();
  worksheet = this.workbook.addWorksheet('Employee Data');
  header = [
    'Cod',
    'Descrição',
    'Fornecedor',
    'Pagamento',
    'Data',
    'Total',
    'Situação',
    'Unidade',
  ];
  headerRow = this.worksheet.addRow(this.header);
  fname = 'contas-a-pagar';

  @ViewChild(EditContasPComponent)
  editContasPComponent: EditContasPComponent;

  @ViewChild(ViewContasPagarComponent)
  viewContasPagarComponent: ViewContasPagarComponent;

  public contas: any = [];
  public conta: any;
  public contasFiltradas: any = [];
  public search: string = '';

  public contasPagarForm: FormGroup = new FormGroup({
    contasPagar: new FormArray([]),
  });

  constructor(private contasPagarService: ContasPagarService) {}

  get contasPagar() {
    return this.contasPagarForm.get('vt') as FormArray;
  }

  ngOnInit(): void {
    this.getContas();
  }

  pesquisarConta() {
    if (this.search.length > 0)
      this.contasFiltradas = this.contas.filter((contasF: any) =>
        contasF.fornecedor?.includes(this.search)
      );
    else this.contasFiltradas = this.contas;
  }

  getContas() {
    this.contasPagarService.find().subscribe((res) => {
      this.contasPagarService.contas = res;
      this.contas = res;
      this.contasFiltradas = this.contas;
    });
  }

  loadPagamento(contas: any) {
    this.editContasPComponent.loadForm(contas);
  }

  loadViewPagamento(contas: any) {
    this.viewContasPagarComponent.loadForm(contas);
  }

  // Excel
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

  delete(conta: any) {
    Swal.fire({
      title: `Deseja deletar ${conta?.id}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.contasPagarService.delete(conta.id).subscribe(() => {
          this.getContas();
          return Swal.fire({
            title: 'Pagamento Deletado!',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        });
      else
        Swal.fire({
          title: 'Ação cancelada!',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
    });
  }
}
