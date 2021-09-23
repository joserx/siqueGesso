import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FaltasService } from 'src/app/services/faltas.service';
import { RhService } from 'src/app/services/rh.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {
  colabOriginal: any
  public rh: any[] = []
  public colab: any[] = []
  public faltaForm: FormGroup = new FormGroup({
    'data': new FormControl(null),
    'colaborador': new FormControl(''),
    'tipo': new FormControl('')
  })
  constructor(
    private faltaService: FaltasService,
    private rhService: RhService
  ) { }

  ngOnInit(): void {
    this.faltaService.find().subscribe((data: any)=>{
      this.colab = data
      this.colabOriginal = data
    })
    this.rhService.find().subscribe((data:any)=>{
      this.rh = data
    })
    console.log(this.rh)
  }

  filterBefore= "";
  filter(event: any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.colab = this.colabOriginal.filter((user : any) => `${user.colaborador} ${user.data.substring(10, 0)} ${user.tipo}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.colab = this.colabOriginal;
        this.colab = this.colabOriginal.filter((user : any) => `${user.colaborador} ${user.data.substring(10, 0)} ${user.tipo}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.colab = this.colabOriginal;
    }
  }
  booleanValue(): boolean{
    return this.colab.length <=10
  }

}
