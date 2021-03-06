import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { ContasPagarService } from 'src/app/services/contas-pagar.service';
import { EditContasPComponent } from './edit-contas-p/edit-contas-p.component';
import { ViewContasPagarComponent } from './view-contas-pagar/view-contas-pagar.component';

import * as XLSX from 'xlsx'

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-contas-a-pagar',
  templateUrl: './contas-a-pagar.component.html',
  styleUrls: ['./contas-a-pagar.component.scss'],
})
export class ContasAPagarComponent implements OnInit {

  fname = 'contas-a-pagar.xlsx';



  @ViewChild(EditContasPComponent)
  editContasPComponent: EditContasPComponent;

  @ViewChild(ViewContasPagarComponent)
  viewContasPagarComponent: ViewContasPagarComponent;

  public contas: any = [];
  public conta: any;
  public contasFiltradas: any = [];
  public search: string = '';
  create: boolean = false
  del: boolean = false

  public contasPagarForm: FormGroup = new FormGroup({
    contasPagar: new FormArray([]),
  });

  constructor(
    private contasPagarService: ContasPagarService,
    private router: Router
  ) {}

  get contasPagar() {
    return this.contasPagarForm.get('vt') as FormArray;
  }

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
    this.getContas();
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
