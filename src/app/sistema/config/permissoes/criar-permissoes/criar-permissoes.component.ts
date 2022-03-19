import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionsService } from 'src/app/services/permissions.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-criar-permissoes',
  templateUrl: './criar-permissoes.component.html',
  styleUrls: ['./criar-permissoes.component.scss']
})
export class CriarPermissoesComponent implements OnInit {

  @ViewChild('opt') opt: ElementRef;
  @Output() eventEmitter = new EventEmitter<any>();
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
    },
    {
      name: 'CONFIGURAÇÕES',
      edit: PermissionsUsers.config_editar,
      delete: PermissionsUsers.config_excluir,
      view: PermissionsUsers.config_ver,
    }
  ]
  formPermission: FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'permission': new FormControl(null, [Validators.required])
  })

  constructor(
    private readonly permissionService: PermissionsService,
    private router: Router
  ) {}

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
  }

  populatePermissions(date: any): void{
    this.eventEmitter.emit(date)
  }


  submitForm(data: any){
    let total: number = 0
    for(let item of this.permissions){
      total+=item
    }
    this.formPermission.get('permission')?.setValue(total)
    if(data.valid && data.value.permission!=0){
      this.permissionService.create(data.value).subscribe((data:any)=>{
        this.permissionService.find().subscribe((data:any)=>{
          this.populatePermissions(data)
          this.closeOpt()
          let currentUrl = this.router.url
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
            console.log(currentUrl);
          });
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: '<h4>Permissão adicionada</h4>',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            width: '500px'
          })
        })
      })
    }else{
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: '<h4>Preencha os campos primeiro</h4>',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        width: '500px'
      })
    }
  }

}
