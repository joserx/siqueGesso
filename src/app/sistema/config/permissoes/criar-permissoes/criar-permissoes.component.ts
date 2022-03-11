import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
@Component({
  selector: 'app-criar-permissoes',
  templateUrl: './criar-permissoes.component.html',
  styleUrls: ['./criar-permissoes.component.scss']
})
export class CriarPermissoesComponent implements OnInit {

  @ViewChild('opt') opt: ElementRef;
  permissions: any = []
  areas: any = [
    {
      name: 'VENDAS',
      edit: PermissionsUsers.vendas_editar,
      delete: PermissionsUsers.vendas_excluir,
      view: PermissionsUsers.vendas_ver,
    },
    {
      name: 'COMPRAS',
      edit: PermissionsUsers.compras_editar,
      delete: PermissionsUsers.compras_excluir,
      view: PermissionsUsers.compras_ver,
    },
    {
      name: 'ESTOQUE',
      edit: PermissionsUsers.estoque_editar,
      delete: PermissionsUsers.estoque_excluir,
      view: PermissionsUsers.estoque_ver,
    },
    {
      name:'FINANCEIRO',
      edit: PermissionsUsers.financeiro_editar,
      delete: PermissionsUsers.financeiro_excluir,
      view: PermissionsUsers.financeiro_ver,
    },
    {
      name: 'EXPEDIÇÃO',
      edit: PermissionsUsers.expedicao_editar,
      delete: PermissionsUsers.expedicao_excluir,
      view: PermissionsUsers.expedicao_ver,
    },
    {
      name: 'RH',
      edit: PermissionsUsers.rh_editar,
      delete: PermissionsUsers.rh_excluir,
      view: PermissionsUsers.rh_ver,
    }
  ]

  constructor() {}

  ngOnInit(): void {
  }

  closeOpt(){
    this.opt.nativeElement.click()
  }

  addPermission(value: string, event: any){
    let input = event
    if(input.target.checked){
      if(this.permissions.indexOf(value)==-1){
        this.permissions.push(value)
      }
    }else{
      this.permissions.splice(this.permissions.indexOf(value), 1)
    }
    console.log(this.permissions)
  }


  submitForm(){
    let total: number = 0
    for(let item of this.permissions){
      total+=item
    }
    console.log(total)
  }

}
