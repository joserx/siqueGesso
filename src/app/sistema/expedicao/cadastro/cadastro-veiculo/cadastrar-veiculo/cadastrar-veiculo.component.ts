import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VeiculosService } from 'src/app/services/veiculos.service';

@Component({
  selector: 'app-cadastrar-veiculo',
  templateUrl: './cadastrar-veiculo.component.html',
  styleUrls: ['./cadastrar-veiculo.component.scss']
})
export class CadastrarVeiculoComponent implements OnInit {

  public veiculoForm: FormGroup = new FormGroup({
    'placa': new FormControl(''),
    'uf': new FormControl(''),
    'cidade': new FormControl(''),
    'tipo': new FormControl(''),
    'marca': new FormControl(''),
    'cor': new FormControl(''),
    'fabricacao': new FormControl(''),
    'codigo': new FormControl(''),
    'rntrc': new FormControl(''), 
    'capacidade': new FormControl(null),
    'tara': new FormControl(null),
    'capacidadeM3': new FormControl(''),
    'placa2': new FormControl(''),
    'placa3': new FormControl('')
  })
  public ufs: any = [
    {'sigla': 'RO'}, {'sigla': 'AC'}, {'sigla': 'AM'}, {'sigla': 'RR'}, {'sigla': 'PA'}, {'sigla': 'AP'}, {'sigla': 'TO'}, {'sigla': 'MA'}, {'sigla': 'PI'}, {'sigla': 'CE'}, {'sigla': 'RN'}, {'sigla': 'PB'},{'sigla': 'PE'}, {'sigla': 'AL'}, {'sigla': 'SE'}, {'sigla': 'BA'}, {'sigla': 'MG'}, {'sigla': 'ES'},{'sigla': 'RJ'}, {'sigla': 'SP'}, {'sigla': 'PR'}, {'sigla': 'SC'}, {'sigla': 'RS'}, {'sigla': 'MS'},{'sigla': 'MT'}, {'sigla': 'GO'}, {'sigla': 'DF'},
  ]

  constructor(
    private readonly veiculosService: VeiculosService
  ) { }

  ngOnInit(): void {
  }

  sendForm(data: any){
    this.veiculosService.create(data.value).subscribe((data: any)=>{
      alert('teste')
    })
  }

}
