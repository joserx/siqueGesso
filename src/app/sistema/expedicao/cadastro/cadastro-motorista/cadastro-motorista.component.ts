import { Component, OnInit } from '@angular/core';
import { RhService } from 'src/app/services/rh.service';

@Component({
  selector: 'app-cadastro-motorista',
  templateUrl: './cadastro-motorista.component.html',
  styleUrls: ['./cadastro-motorista.component.scss']
})
export class CadastroMotoristaComponent implements OnInit {

  public motoristas: any[] = []

  constructor(
    private readonly rhService: RhService
  ) { }

  ngOnInit(): void {
    this.rhService.find().subscribe((data:any)=>{
      for(let oneData of data){
        if(oneData.role.toLowerCase()==="motorista"){
          this.motoristas.push(oneData)
        }
      }
    })
  }

}
