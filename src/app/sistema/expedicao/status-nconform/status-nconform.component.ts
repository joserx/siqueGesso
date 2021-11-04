import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NconfromService } from 'src/app/services/nconfrom.service';
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

  constructor(
    private readonly nConformService: NconfromService,
    private readonly statusService: StatusService
  ) { }

  ngOnInit(): void {
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
          title: 'Status criado !', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true 
        })
      })
    }
  }

  addNConform(data: any){
    if(data.valid){
      this.nConformService.create(data.value).subscribe((data: any)=>{
        this.initializer("nConform")
        Swal.fire({ 
          title: 'Não conformidade criada !', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true 
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
      title: 'Você gostaria de deletar a Não conformidade ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({ 
          title: 'Não conformidade deletada !', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true 
        })
        if(id && Number(id)){
          this.nConformService.delete(id).subscribe((data: any)=>{
            this.initializer("nConform")
          })
        }
      } else if (result.isDenied) {
        Swal.fire({ 
          title: 'Não conformidade não deletada !', 
          icon: 'info', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true 
        })
      }
    })
  }

  deleteStatus(id: number){
    Swal.fire({
      title: 'Você gostaria de deletar o status ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({ 
          title: 'Status deletado !', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true 
        })
        if(id && Number(id)){
          this.statusService.delete(id).subscribe((data: any)=>{
            this.initializer("status")
          })
        }
      } else if (result.isDenied) {
        Swal.fire({ 
          title: 'Status não deletado !', 
          icon: 'info', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true 
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
        title: 'Não conformidade atualizada!', 
        icon: 'success', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true
      })
    })
  }

  attNStatus(id: number, data: any){
    this.statusService.update(id, data.value).subscribe((data: any)=>{
      this.initializer("status")
      Swal.fire({ 
        title: 'Status atualizado!', 
        icon: 'success', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true
      })
    })
  }

}
