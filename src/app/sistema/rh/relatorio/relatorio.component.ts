import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {

  public faltaForm: FormGroup = new FormGroup({
    'data': new FormControl(null),
    'cargo': new FormControl(''),
    'tipoFalta': new FormControl('')
  })
  constructor() { }

  ngOnInit(): void {
  }

}
