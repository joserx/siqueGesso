import { Component, OnInit } from '@angular/core';
import { VeiculosService } from 'src/app/services/veiculos.service';

@Component({
  selector: 'app-cadastro-veiculo',
  templateUrl: './cadastro-veiculo.component.html',
  styleUrls: ['./cadastro-veiculo.component.scss']
})
export class CadastroVeiculoComponent implements OnInit {

  public veiculos: any[] = [] 

  constructor(
    private readonly veiculosService: VeiculosService
  ) { }

  ngOnInit(): void {
    this.veiculosService.find().subscribe((data:any)=>{
      this.veiculos = data
    })
  }

  delete(id:number){
    
  }

}
