import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VeiculosService } from 'src/app/services/veiculos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-veiculo',
  templateUrl: './cadastrar-veiculo.component.html',
  styleUrls: ['./cadastrar-veiculo.component.scss']
})
export class CadastrarVeiculoComponent implements OnInit {

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

  constructor(
    private readonly veiculosService: VeiculosService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  sendForm(data: any){
    if(data.valid){
      this.veiculosService.create(data.value).subscribe((data: any)=>{
        this.router.navigate(['sistema', 'expedicao', 'cadastro', 'veiculo'])
        Swal.fire({ 
          title: '<h4>Novo veículo cadastrado!</h4>', 
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
        title: '<h4>Preencha os campos obrigatórios!</h4>', 
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
