import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PermissionsService } from 'src/app/services/permissions.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-visualizar-categoria',
  templateUrl: './visualizar-categoria.component.html',
  styleUrls: ['./visualizar-categoria.component.scss']
})
export class VisualizarCategoriaComponent implements OnInit, OnChanges {

  @ViewChild('opt') opt: ElementRef;
  @Input() permissionId: number
  constructor(
    private permissionService: PermissionsService
  ) { }
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
  permission: any = {}
  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.permissionId.currentValue){
      this.permissionId = changes.permissionId.currentValue 
      this.permissionService.findOne(changes.permissionId.currentValue).subscribe((data:any)=>{
        this.permission = data
      })
    }
  }

  permissionCheck(permission:any, permitted:any){
    for(let item of this.areas){
      if((permission & item.edit)==item.edit){
        // console.log(item.edit)
      }
      if((permission & item.delete)==item.delete){
        // console.log(item.delete)
      }
      if((permission & item.view)==item.view){
        // console.log(item.view)
      }
    }
    return (permission & permitted)==permitted
  }

  closeOpt(){
    this.opt.nativeElement.click()
  }

}
