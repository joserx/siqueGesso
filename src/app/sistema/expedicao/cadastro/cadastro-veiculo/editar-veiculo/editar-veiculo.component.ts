import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { VeiculosService } from 'src/app/services/veiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-veiculo',
  templateUrl: './editar-veiculo.component.html',
  styleUrls: ['./editar-veiculo.component.scss']
})
export class EditarVeiculoComponent implements OnInit {

  public veiculoForm: FormGroup = new FormGroup({
    'placa': new FormControl('', [Validators.required]),
    'uf': new FormControl('', [Validators.required]),
    'cidade': new FormControl('', [Validators.required]),
    'tipo': new FormControl('', [Validators.required]),
    'marca': new FormControl('', [Validators.required]),
    'cor': new FormControl('', [Validators.required]),
    'fabricacao': new FormControl('', [Validators.required]),
    'codigo': new FormControl('', [Validators.required]),
    'rntrc': new FormControl('', [Validators.required]), 
    'capacidade': new FormControl('', [Validators.required]),
    'tara': new FormControl('', [Validators.required]),
    'capacidadeM3': new FormControl('', [Validators.required]),
    'placa2': new FormControl(''),
    'placa3': new FormControl('')
  })
  public ufs: any = [
    {'sigla': 'RO'}, {'sigla': 'AC'}, {'sigla': 'AM'}, {'sigla': 'RR'}, {'sigla': 'PA'}, {'sigla': 'AP'}, {'sigla': 'TO'}, {'sigla': 'MA'}, {'sigla': 'PI'}, {'sigla': 'CE'}, {'sigla': 'RN'}, {'sigla': 'PB'},{'sigla': 'PE'}, {'sigla': 'AL'}, {'sigla': 'SE'}, {'sigla': 'BA'}, {'sigla': 'MG'}, {'sigla': 'ES'},{'sigla': 'RJ'}, {'sigla': 'SP'}, {'sigla': 'PR'}, {'sigla': 'SC'}, {'sigla': 'RS'}, {'sigla': 'MS'},{'sigla': 'MT'}, {'sigla': 'GO'}, {'sigla': 'DF'},
  ]
  public id: number = 0


  constructor(
    private readonly veiculosService: VeiculosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_editar) == PermissionsUsers.expedicao_editar)){
      this.router.navigate(['sistema'])
    }
    const routeParams = this.route.snapshot.paramMap
    this.id = Number(routeParams.get('id'))
    this.veiculosService.findOne(this.id).subscribe((data:any)=>{
      this.veiculoForm.get('placa')?.setValue(data.placa)
      this.veiculoForm.get('uf')?.setValue(data.uf)
      this.veiculoForm.get('cidade')?.setValue(data.cidade)
      this.veiculoForm.get('tipo')?.setValue(data.tipo)
      this.veiculoForm.get('marca')?.setValue(data.marca)
      this.veiculoForm.get('cor')?.setValue(data.cor)
      this.veiculoForm.get('fabricacao')?.setValue(data.fabricacao)
      this.veiculoForm.get('codigo')?.setValue(data.codigo)
      this.veiculoForm.get('rntrc')?.setValue(data.rntrc)
      this.veiculoForm.get('capacidade')?.setValue(data.capacidade)
      this.veiculoForm.get('tara')?.setValue(data.tara)
      this.veiculoForm.get('capacidadeM3')?.setValue(data.capacidadeM3)
      this.veiculoForm.get('placa2')?.setValue(data.placa2)
      this.veiculoForm.get('placa3')?.setValue(data.placa3)
    })
  }


  sendForm(data: any){
    for(let control in data['controls']){
      if(data['controls'][control].status=="INVALID"){
        console.log(control, data['controls'][control])
      }
    }
    if(data.valid){
      this.veiculosService.update(this.id, data.value).subscribe((data: any)=>{
        this.router.navigate(['sistema', 'expedicao', 'cadastro', 'veiculo'])
        Swal.fire({ 
          title: '<h4>Ve??culo atualizado!</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true ,
          width: '500px',
        })
      })
    }else{
      Swal.fire({ 
        title: '<h4>Preencha os campos obrigat??rios!</h4>', 
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

}
