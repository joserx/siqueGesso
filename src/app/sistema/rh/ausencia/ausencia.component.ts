import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AusenciaService } from 'src/app/services/ausencia.service';
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
    private rhService: RhService
  ) { }

  ngOnInit(): void {
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
    if(this.ausenciaForm.valid){
      this.ausenciaService.create(data).subscribe(()=>{
        this.ausenciaForm.get('colaborador')?.setValue('')
        this.ausenciaForm.get('cargo')?.setValue('')
        this.ausenciaForm.get('data')?.setValue(null)
        this.ausenciaForm.get('tipo')?.setValue('')
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Falta adicionada',
          showConfirmButton: false,
          timer: 1500
        })
        this.ausenciaService.find().subscribe((data: any)=>{
          this.colab = data
          console.log(this.colab)
        })
      })
    }else{
      Swal.fire('Erro', 'Preencha os campos necessários', 'error')
    }
  }

  delete(id: number){
    Swal.fire({
      title: 'Você gostaria de deletar essa falta ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Falta deletada', '', 'success')
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
        Swal.fire('A falta não foi deletada', '', 'info')
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
