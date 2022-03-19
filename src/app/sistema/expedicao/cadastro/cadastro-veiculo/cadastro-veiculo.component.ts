import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { VeiculosService } from 'src/app/services/veiculos.service';

@Component({
  selector: 'app-cadastro-veiculo',
  templateUrl: './cadastro-veiculo.component.html',
  styleUrls: ['./cadastro-veiculo.component.scss']
})
export class CadastroVeiculoComponent implements OnInit {

  public veiculos: any[] = [] 

  constructor(
    private readonly veiculosService: VeiculosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_editar) == PermissionsUsers.expedicao_editar)){
      this.router.navigate(['sistema'])
    }
    this.veiculosService.find().subscribe((data:any)=>{
      this.veiculos = data
    })
  }

  delete(id:number){
    
  }

}
