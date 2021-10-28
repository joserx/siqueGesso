import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-motorista',
  templateUrl: './cadastrar-motorista.component.html',
  styleUrls: ['./cadastrar-motorista.component.scss']
})
export class CadastrarMotoristaComponent implements OnInit {

  public motoristaForm: FormGroup = new FormGroup({
    'nome': new FormControl(''),
    'categoria': new FormControl(''),
    'ultimaDataEmbarque': new FormControl(null)
  })

  constructor() { }

  ngOnInit(): void {
  }

}
