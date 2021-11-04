import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaixaService } from 'src/app/services/baixa.service';
import { EmbarqueService } from 'src/app/services/embarque.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-baixa-entrega',
  templateUrl: './baixa-entrega.component.html',
  styleUrls: ['./baixa-entrega.component.scss']
})
export class BaixaEntregaComponent implements OnInit {

  public baixaForm: FormGroup = new FormGroup({
    'numero': new FormControl(null, [Validators.required]),
    'data': new FormControl(null, [Validators.required]),
    'sign': new FormControl('', [Validators.required]),
    'driver': new FormControl('', [Validators.required])
  })
  public baixas: any[] = []

  constructor(
    private readonly embarqueService: EmbarqueService,
    private readonly baixaService: BaixaService
  ) { }

  ngOnInit(): void {
    this.baixaService.find().subscribe((data:any)=>{
      this.baixas = data
    })
  }

  findEmbarque(id: number){
    if(id!=null){
      this.embarqueService.findOne(id).subscribe((data: any)=>{
        if(data==null){
          this.baixaForm.get('sign')?.setValue('')
          this.baixaForm.get('driver')?.setValue('')
          Swal.fire({ 
            title: 'Embarque não existe !', 
            icon: 'error', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true 
            
          })
        }else{
          this.baixaForm.get('sign')?.setValue(data.sign)
          this.baixaForm.get('driver')?.setValue(data.driver)
          Swal.fire({ 
            title: 'Embarque encontrado !', 
            icon: 'success', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true 
            
          })
        }
      })
    }
  }

  baixaEntrega(data: any){
    let exists: any[] = []
    if(data.valid){
      for(let oneBaixa of this.baixas){
        if(data.value.numero == oneBaixa.numero){
          exists.push(oneBaixa)
        }
      }
      if(exists.length==0){
        let newData = new Date(data.value.data)
        newData.setDate(newData.getDate() + 1)
        data.value.data = newData.toISOString()
        this.baixaService.create(data.value).subscribe((data:any)=>{
        this.initializer()
        Swal.fire({ 
            title: 'Baixa de entrega realizada com sucesso !', 
            icon: 'success', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true 
          })
        })
      }else{
        Swal.fire({ 
          title: 'Entrega já recebeu baixa !', 
          icon: 'error', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true 
        })
        exists = []
      }
     
    }else{
      Swal.fire({ 
        title: 'Preencha os campos necessários !', 
        icon: 'error', 
        toast: true, 
        position: 'top', 
        showConfirmButton: false, 
        timer: 2000, 
        timerProgressBar: true 
        
      })
    }
  }

  initializer(){
    this.baixaService.find().subscribe((data: any)=>{
      this.baixas = data
    })
  }

}
