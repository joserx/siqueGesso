import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AusenciaService } from 'src/app/services/ausencia.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { RhService } from 'src/app/services/rh.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ausencia',
  templateUrl: './ausencia.component.html',
  styleUrls: ['./ausencia.component.scss']
})
export class AusenciaComponent implements OnInit {

  public colabAtivo: any[] = []
  colabOriginal: any
  public colab: any[] = []
  public ausenciaForm: FormGroup = new FormGroup({
    'colaborador': new FormControl('', [Validators.required]),
    'cargo': new FormControl('', [Validators.required]),
    'data': new FormControl(null, [Validators.required]),
    'tipo': new FormControl('', [Validators.required]),
    'de': new FormControl(null),
    'ate': new FormControl(null),
    'rh': new FormControl(null)
  })
  constructor(
    private ausenciaService: AusenciaService,
    private rhService: RhService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.rh_editar) == PermissionsUsers.rh_editar)){
      this.router.navigate(['sistema', 'rh'])
    }
    this.ausenciaService.find().subscribe((data: any)=>{
      this.colab = data
      this.colabOriginal = data
    })
    this.rhService.find().subscribe((data: any)=>{
      for(let value in data){
        if(data[value]['disabled']==false){
          this.colabAtivo.push(data[value])
        }
      }
    })
  }

  selecionar(data: any){
    this.ausenciaForm.get('colaborador')?.setValue(`${data.name} ${data.surname}`)
    this.ausenciaForm.get('cargo')?.setValue(data.role)
    this.ausenciaForm.get('rh')?.setValue(data.id)
    console.log(this.ausenciaForm)
  }

  submitForm(data: any){
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.rh_editar) == PermissionsUsers.rh_editar){
      if(this.ausenciaForm.valid){
        this.ausenciaService.create(data).subscribe(()=>{
          this.ausenciaForm.get('colaborador')?.setValue('')
          this.ausenciaForm.get('cargo')?.setValue('')
          this.ausenciaForm.get('data')?.setValue(null)
          this.ausenciaForm.get('tipo')?.setValue('')
          Swal.fire({ 
            title: '<h4>Aus??ncia adicionada !</h4>', 
            icon: 'success', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true,
            width: '500px',
          })
          this.ausenciaService.find().subscribe((data: any)=>{
            this.colab = data
            console.log(this.colab)
          })
        })
      }else{
        Swal.fire({ 
          title: '<h4>Preencha os campos necess??rios !</h4>', 
          icon: 'error', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px',
        })
      }
    }else{
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: '<h4>Voc?? n??o possui permiss??o para isso !</h4>',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        width: '500px',
      });
    }
  }

  delete(id: number){
    Swal.fire({
      title: 'Voc?? gostaria de deletar essa falta ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({ 
          title: '<h4>Aus??ncia deletada !</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px',
        })
        this.ausenciaService.delete(id).subscribe(()=>{
          this.ausenciaService.find().subscribe((data: any)=>{
            this.colab = data
            console.log(this.colab)
            this.ausenciaForm.get('colaborador')?.setValue('')
            this.ausenciaForm.get('cargo')?.setValue('')
            this.ausenciaForm.get('data')?.setValue(null)
            this.ausenciaForm.get('tipo')?.setValue('')
          })
        })
      } else if (result.isDenied) {
        Swal.fire({ 
          title: '<h4>Aus??ncia n??o deletada !</h4>', 
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

  filterBefore = "";
  filtrar(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.colab = this.colabOriginal.filter((user : any) => `${user.colaborador} ${user.cargo} ${user.data.substring(10, 0)} ${user.tipo}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.colab = this.colabOriginal;
        this.colab = this.colabOriginal.filter((user : any) => `${user.colaborador} ${user.cargo} ${user.data.substring(10, 0)} ${user.tipo}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.colab = this.colabOriginal;
    }
  }

}
