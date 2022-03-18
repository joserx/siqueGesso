import { Component, OnInit, ViewChild } from '@angular/core';
import { ContasReceberService } from 'src/app/services/contas-receber.service';
import { EditRecebimentoComponent } from './edit-recebimento/edit-recebimento.component';
import { ViewRecebimentoComponent } from './view-recebimento/view-recebimento.component';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas-a-receber',
  templateUrl: './contas-a-receber.component.html',
  styleUrls: ['./contas-a-receber.component.scss'],
})
export class ContasAReceberComponent implements OnInit {
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

  @ViewChild(EditRecebimentoComponent)
  editRecebimentosComponent: EditRecebimentoComponent;

  @ViewChild(ViewRecebimentoComponent)
  viewRecebimentosComponent: ViewRecebimentoComponent;

  public recebimentos: any = [];
  public recebimento: any;
  public recebimentosFiltrados: any = [];
  public search: string = '';

  constructor(private contasReceberService: ContasReceberService) {}

  ngOnInit(): void {
    this.getRecebimentos();
  }

  pesquisarConta() {
    if (this.search.length > 0)
      this.recebimentosFiltrados = this.recebimentos.filter(
        (recebimentosF: any) => recebimentosF.cliente?.includes(this?.search)
      );
    else this.recebimentosFiltrados = this.recebimentos;
  }

  getRecebimentos() {
    this.contasReceberService.find().subscribe((res) => {
      this.contasReceberService.contas = res;
      this.recebimentos = res;
      this.recebimentosFiltrados = this.recebimentos;
    });
  }

  loadRecebimento(recebimentos: any) {
    this.editRecebimentosComponent.loadForm(recebimentos);
  }

  loadViewRecebimento(recebimentos: any) {
    this.viewRecebimentosComponent.loadForm(recebimentos);
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

  delete(recebimento: any) {
    Swal.fire({
      title: `Deseja deletar ${recebimento?.id}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.contasReceberService.delete(recebimento?.id).subscribe(() => {
          this.getRecebimentos();
          return Swal.fire({
            title: 'Produto Deletado!',
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
