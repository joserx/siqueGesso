import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionsService } from 'src/app/services/permissions.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-permissoes',
  templateUrl: './editar-permissoes.component.html',
  styleUrls: ['./editar-permissoes.component.scss']
})
export class EditarPermissoesComponent implements OnInit, OnChanges {

  @ViewChild('opt') opt: ElementRef;
  @Output() eventEmitter = new EventEmitter<any>();
  @Input() permissionId: number
  constructor(
    private permissionService: PermissionsService,
    private router: Router
  ) { }
  permissions: any = []
  areas: any = [
    {
      name: 'VENDAS',
      edit: PermissionsUsers.vendas_editar,
      delete: PermissionsUsers.vendas_excluir,
      view: PermissionsUsers.vendas_ver,
      editFormControl: 'edit1',
      deleteFormControl: 'delete1',
      viewFormControl: 'view1'
    },
    {
      name: 'COMPRAS',
      edit: PermissionsUsers.compras_editar,
      delete: PermissionsUsers.compras_excluir,
      view: PermissionsUsers.compras_ver,
      editFormControl: 'edit2',
      deleteFormControl: 'delete2',
      viewFormControl: 'view2'
    },
    {
      name: 'ESTOQUE',
      edit: PermissionsUsers.estoque_editar,
      delete: PermissionsUsers.estoque_excluir,
      view: PermissionsUsers.estoque_ver,
      editFormControl: 'edit3',
      deleteFormControl: 'delete3',
      viewFormControl: 'view3'
    },
    {
      name:'FINANCEIRO',
      edit: PermissionsUsers.financeiro_editar,
      delete: PermissionsUsers.financeiro_excluir,
      view: PermissionsUsers.financeiro_ver,
      editFormControl: 'edit4',
      deleteFormControl: 'delete4',
      viewFormControl: 'view4'
    },
    {
      name: 'EXPEDIÇÃO',
      edit: PermissionsUsers.expedicao_editar,
      delete: PermissionsUsers.expedicao_excluir,
      view: PermissionsUsers.expedicao_ver,
      editFormControl: 'edit5',
      deleteFormControl: 'delete5',
      viewFormControl: 'view5'
    },
    {
      name: 'RH',
      edit: PermissionsUsers.rh_editar,
      delete: PermissionsUsers.rh_excluir,
      view: PermissionsUsers.rh_ver,
      editFormControl: 'edit6',
      deleteFormControl: 'delete6',
      viewFormControl: 'view6'
    },
    {
      name: 'CONFIGURAÇÕES',
      edit: PermissionsUsers.config_editar,
      delete: PermissionsUsers.config_excluir,
      view: PermissionsUsers.config_ver,
      editFormControl: 'edit7',
      deleteFormControl: 'delete7',
      viewFormControl: 'view7'
    }
  ]
  permission: any = {}
  permissionForm: FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'permission': new FormControl()
  })

  ngOnInit(): void {
  }
  
  teste(){
    alert('teste')
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.permissions = []
    this.permission = {}
    if(changes.permissionId.currentValue){
      this.permissionId = changes.permissionId.currentValue 
      this.permissionService.findOne(this.permissionId).subscribe((data:any)=>{
        this.permissionForm.get('name')?.setValue(data.name)
        this.permission = data
        for(let item of this.areas){
          this.permissionCheck(data.permission, item, true)
        }
      })
    }
  }

  closeOpt(){
    this.opt.nativeElement.click()
  }

  permissionCheck(permission:any, permitted:any, add?:boolean ){
    if(add==true){
      if((permission & permitted.edit)==permitted.edit){
        if(this.permissions.indexOf(permitted.edit)==-1){
          this.permissions.push(permitted.edit)
        }
      }
      if((permission & permitted.delete)==permitted.delete){
        if(this.permissions.indexOf(permitted.delete)==-1){
          this.permissions.push(permitted.delete)
        }
      }
      if((permission & permitted.view)==permitted.view){
        if(this.permissions.indexOf(permitted.view)==-1){
          this.permissions.push(permitted.view)
        }
      }
    }
    return (permission & permitted)==permitted
  }

  submitForm(data:any){
    if(data.valid && data.value.permission!=0){
      let total: number = 0
      for(let item of this.permissions){
        total+=item
      }
      data.value.permission=total
      this.permissionService.update(this.permissionId, data.value).subscribe((data: any)=>{
        this.permissionService.find().subscribe((data:any)=>{
          this.permission = {}
          this.permissions = []
          this.permissionForm.reset()
          this.closeOpt()
          let currentUrl = this.router.url
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: '<h4>Permissão editada</h4>',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            width: '500px'
          })
        })
      })
    }
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
  }

  populatePermissions(date: any): void{
    this.eventEmitter.emit(date)
  }

}
