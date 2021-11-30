import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FaltasService } from 'src/app/services/faltas.service';
import { RhService } from 'src/app/services/rh.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apont-faltas',
  templateUrl: './apont-faltas.component.html',
  styleUrls: ['./apont-faltas.component.scss']
})
export class ApontFaltasComponent implements OnInit {

  public colabAtivo: any[] = []
  colabOriginal: any
  public colab: any[] = []
  public apontForm: FormGroup = new FormGroup({
    'colaborador': new FormControl('', [Validators.required]),
    'cargo': new FormControl('', [Validators.required]),
    'data': new FormControl(null, [Validators.required]),
    'tipo': new FormControl('', [Validators.required]),
    'rh': new FormControl(null),
    'periodo': new FormControl('', [Validators.required]),
    'tempo': new FormControl('', [Validators.required]),
    'diasAtestado': new FormControl(''),
    'atestado': new FormControl('')
  })
  constructor(
    private faltaService: FaltasService,
    private rhService: RhService
  ) {}
  
  ngOnInit(): void {
    this.faltaService.find().subscribe((data: any)=>{
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
    this.apontForm.get('colaborador')?.setValue(`${data.name} ${data.surname}`)
    this.apontForm.get('cargo')?.setValue(data.role)
    this.apontForm.get('rh')?.setValue(data.id)
  }

  submitForm(data: any){
    if(this.apontForm.valid){
      this.faltaService.create(data).subscribe(()=>{
        this.apontForm.get('colaborador')?.setValue('')
        this.apontForm.get('cargo')?.setValue('')
        this.apontForm.get('data')?.setValue(null)
        this.apontForm.get('tipo')?.setValue('')
        this.apontForm.get('periodo')?.setValue('')
        this.apontForm.get('tempo')?.setValue(null)
        this.apontForm.get('diasAtestado')?.setValue('')
        this.apontForm.get('atestado')?.setValue('')
        Swal.fire({ 
          title: '<h4>Falta adicionada !</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px',
        })
        this.faltaService.find().subscribe((data: any)=>{
          this.colab = data
          console.log(this.colab)
        })
      })
    }else{
      Swal.fire({ 
        title: '<h4>Preencha os campos necessários !</h4>', 
        icon: 'error', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true,
        width: '500px',
      })
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
        Swal.fire({ 
          title: '<h4>Falta deletada !</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px',
        })
        this.faltaService.delete(id).subscribe(()=>{
          this.faltaService.find().subscribe((data: any)=>{
            this.colab = data
            console.log(this.colab)
            this.apontForm.get('colaborador')?.setValue('')
            this.apontForm.get('cargo')?.setValue('')
            this.apontForm.get('data')?.setValue(null)
            this.apontForm.get('tipo')?.setValue('')
            this.apontForm.get('periodo')?.setValue('')
            this.apontForm.get('tempo')?.setValue(null)
            this.apontForm.get('diasAtestado')?.setValue('')
            this.apontForm.get('atestado')?.setValue('')
          })
        })
      } else if (result.isDenied) {
        Swal.fire({ 
          title: '<h4>Falta não deletada !</h4>', 
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
