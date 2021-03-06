import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NconfromService } from 'src/app/services/nconfrom.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { StatusService } from 'src/app/services/status.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-status-nconform',
  templateUrl: './status-nconform.component.html',
  styleUrls: ['./status-nconform.component.scss']
})
export class StatusNconformComponent implements OnInit {

  public statusForm: FormGroup = new FormGroup({
    'name': new FormControl('' ,[Validators.required])
  })
  public attstatusForm: FormGroup = new FormGroup({
    'name': new FormControl('')
  })
  public nconformForm: FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.required])
  })
  public attnconformForm: FormGroup = new FormGroup({
    'name': new FormControl('')
  })
  public nConform: any[] = []
  public thisConformName: string
  public thisStatusName: string
  public atualId: number
  public status: any[] = []
  create: boolean = false
  delete: boolean = false

  constructor(
    private readonly nConformService: NconfromService,
    private readonly statusService: StatusService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_ver) == PermissionsUsers.expedicao_ver)){
      this.router.navigate(['sistema'])
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_editar) == PermissionsUsers.expedicao_editar){
      this.create = true
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_excluir) == PermissionsUsers.expedicao_excluir){
      this.delete = true
    }
    this.nConformService.find().subscribe((data: any)=>{
      this.nConform = data
    })
    this.statusService.find().subscribe((data: any)=>{
      this.status = data
    })
  }

  addStatus(data: any){
    if(data.valid){
      this.statusService.create(data.value).subscribe((data: any)=>{
        this.initializer("status")
        Swal.fire({ 
          title: '<h4>Status criado !</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px',
        })
      })
    }
  }

  addNConform(data: any){
    if(data.valid){
      this.nConformService.create(data.value).subscribe((data: any)=>{
        this.initializer("nConform")
        Swal.fire({ 
          title: '<h4>N??o conformidade criada !</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px',
        })
      })
    }
  }

  initializer(data: string){
    if(data=="status"){
      this.statusService.find().subscribe((data: any)=>{
        this.status = data
      })
    }else if(data=="nConform"){
      this.nConformService.find().subscribe((data:any)=>{
        this.nConform = data
      })
    }
  }

  deleteConform(id: number){
    Swal.fire({
      title: 'Voc?? gostaria de deletar a N??o conformidade ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({ 
          title: '<h4>N??o conformidade deletada !</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px',
        })
        if(id && Number(id)){
          this.nConformService.delete(id).subscribe((data: any)=>{
            this.initializer("nConform")
          })
        }
      } else if (result.isDenied) {
        Swal.fire({ 
          title: '<h5>N??o conformidade n??o deletada !</h5>', 
          icon: 'info', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px', 
        })
      }
    })
  }

  deleteStatus(id: number){
    Swal.fire({
      title: 'Voc?? gostaria de deletar o status ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({ 
          title: '<h4>Status deletado !</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true ,
          width: '500px',
        })
        if(id && Number(id)){
          this.statusService.delete(id).subscribe((data: any)=>{
            this.initializer("status")
          })
        }
      } else if (result.isDenied) {
        Swal.fire({ 
          title: '<h4>Status n??o deletado !</h4>', 
          icon: 'info', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px',
        })
      }
    })
  }

  findConform(id: number){
    this.nConformService.findOne(id).subscribe((data: any)=>{
      this.thisConformName = data.name
      this.atualId = data.id
    }, (err)=>{
      console.log(err)
    }, ()=> {
      this.attnconformForm.get('name')?.setValue(this.thisConformName)
    })
  }

  findStatus(id: number){
    this.statusService.findOne(id).subscribe((data: any)=>{
      this.thisStatusName = data.name
      this.atualId = data.id
    }, (err)=>{
      console.log(err)
    }, ()=> {
      this.attstatusForm.get('name')?.setValue(this.thisStatusName)
    })
  }

  attNConform(id: number, data: any){
    this.nConformService.update(id, data.value).subscribe((data: any)=>{
      this.initializer("nConform")
      Swal.fire({ 
        title: '<h4>N??o conformidade atualizada!</h4>', 
        icon: 'success', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true,
        width: '500px'
      })
    })
  }

  attNStatus(id: number, data: any){
    this.statusService.update(id, data.value).subscribe((data: any)=>{
      this.initializer("status")
      Swal.fire({ 
        title: '<h4>Status atualizado!</h4>', 
        icon: 'success', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true,
        width: '500px'
      })
    })
  }

}
