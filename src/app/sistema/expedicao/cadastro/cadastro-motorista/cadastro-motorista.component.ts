import { Component, OnInit } from '@angular/core';
import { EmbarqueService } from 'src/app/services/embarque.service';
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
    private readonly embarqueService: EmbarqueService
  ) { }

  ngOnInit(): void {
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
