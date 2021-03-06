import { Component, OnInit, ViewChild } from '@angular/core';
import { ContasReceberService } from 'src/app/services/contas-receber.service';
import { EditRecebimentoComponent } from './edit-recebimento/edit-recebimento.component';
import { ViewRecebimentoComponent } from './view-recebimento/view-recebimento.component';

import * as XLSX from 'xlsx'
import Swal from 'sweetalert2';

import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contas-a-receber',
  templateUrl: './contas-a-receber.component.html',
  styleUrls: ['./contas-a-receber.component.scss'],
})
export class ContasAReceberComponent implements OnInit {

  fname = 'contas-a-receber.xlsx';

  @ViewChild(EditRecebimentoComponent)
  editRecebimentosComponent: EditRecebimentoComponent;

  @ViewChild(ViewRecebimentoComponent)
  viewRecebimentosComponent: ViewRecebimentoComponent;

  public recebimentos: any = [];
  public recebimento: any;
  public recebimentosFiltrados: any = [];
  public search: string = '';
  create: boolean = false
  del: boolean = false

  constructor(
    private contasReceberService: ContasReceberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.financeiro_ver) == PermissionsUsers.financeiro_ver)){
      this.router.navigate(['sistema'])
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.financeiro_editar) == PermissionsUsers.financeiro_editar){
      this.create = true
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.financeiro_excluir) == PermissionsUsers.financeiro_excluir){
      this.del = true
    }
    this.getRecebimentos();
  }

  exportExcel(): void{
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fname);
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
          title: 'A????o cancelada!',
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
