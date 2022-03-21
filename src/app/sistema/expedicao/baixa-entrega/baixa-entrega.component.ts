import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaixaService } from 'src/app/services/baixa.service';
import { EmbarqueService } from 'src/app/services/embarque.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
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
  create: boolean = false

  constructor(
    private readonly embarqueService: EmbarqueService,
    private readonly baixaService: BaixaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_ver) == PermissionsUsers.expedicao_ver)){
      this.router.navigate(['sistema'])
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_editar) == PermissionsUsers.expedicao_editar){
      this.create = true
    }
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
            title: '<h4>Embarque não existe !</h4>', 
            icon: 'error', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true,
            width: '500px',
          })
        }else{
          this.baixaForm.get('sign')?.setValue(data.sign)
          this.baixaForm.get('driver')?.setValue(data.driver)
          Swal.fire({ 
            title: '<h4>Embarque encontrado !</h4>', 
            icon: 'success', 
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
            title: '<h4>Baixa de entrega realizada com sucesso !</h4>', 
            icon: 'success', 
            toast: true, 
            position: 'top', 
            showConfirmButton: false, 
            timer: 2000, 
            timerProgressBar: true,
            width: '500px',
          })
        })
      }else{
        Swal.fire({ 
          title: '<h3>Entrega já recebeu baixa !</h3>', 
          icon: 'error', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true,
          width: '500px',
        })
        exists = []
      }
     
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

  initializer(){
    this.baixaService.find().subscribe((data: any)=>{
      this.baixas = data
    })
  }

}
