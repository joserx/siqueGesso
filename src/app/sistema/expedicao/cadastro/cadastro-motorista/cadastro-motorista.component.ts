import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmbarqueService } from 'src/app/services/embarque.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { RhService } from 'src/app/services/rh.service';

@Component({
  selector: 'app-cadastro-motorista',
  templateUrl: './cadastro-motorista.component.html',
  styleUrls: ['./cadastro-motorista.component.scss']
})
export class CadastroMotoristaComponent implements OnInit {

  public motoristas: any[] = []
  public embarques: any[] = []
  public listDriver: any[] = []

  constructor(
    private readonly rhService: RhService,
    private readonly embarqueService: EmbarqueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_editar) == PermissionsUsers.expedicao_editar)){
      this.router.navigate(['sistema'])
    }
    this.embarqueService.find().subscribe((data:any)=>{
      this.embarques = data
    })
    this.rhService.find().subscribe((data:any)=>{
      for(let oneData of data){
        if(oneData.role.toLowerCase()=="motorista"){
          this.motoristas.push(oneData)
        }
      }
    })
  }

}
