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

  colabOriginal: any
  public colab: any[] = []
  public apontForm: FormGroup = new FormGroup({
    'colaborador': new FormControl('', [Validators.required]),
    'cargo': new FormControl('', [Validators.required]),
    'data': new FormControl(null, [Validators.required]),
    'tipo': new FormControl('', [Validators.required])
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
  }
  
  selecionar(data: any){
    this.apontForm.get('colaborador')?.setValue(`${data.name} ${data.surname}`),
    this.apontForm.get('cargo')?.setValue(data.role)
  }

  submitForm(data: any){
    if(this.apontForm.valid){
      this.faltaService.create(data).subscribe(()=>{
        this.faltaService.find().subscribe((data: any)=>{
          this.colab = data
          console.log(this.colab)
        })
      })
    }else{
      Swal.fire('Erro', 'Preencha os campos necessários', 'error')
    }
  }

  delete(id: number){
    this.faltaService.delete(id).subscribe(()=>{
      this.faltaService.find().subscribe((data: any)=>{
        this.colab = data
        console.log(this.colab)
      })
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
        this.colab = this.colabOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.colab = this.colabOriginal;
    }
  }

}
