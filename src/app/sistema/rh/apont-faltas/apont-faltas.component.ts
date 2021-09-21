import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RhService } from 'src/app/services/rh.service';
import { PesquisarColabComponent } from './pesquisar-colab/pesquisar-colab.component';

@Component({
  selector: 'app-apont-faltas',
  templateUrl: './apont-faltas.component.html',
  styleUrls: ['./apont-faltas.component.scss']
})
export class ApontFaltasComponent implements OnInit {

  public apontForm: FormGroup = new FormGroup({
    'colaborador': new FormControl(''),
    'cargo': new FormControl('')
  })
  constructor() {}
  
  ngOnInit(): void {
    
  }
  
  selecionar(data: any){
    this.apontForm.get('colaborador')?.setValue(`${data.name} ${data.surname}`)
  }

}
