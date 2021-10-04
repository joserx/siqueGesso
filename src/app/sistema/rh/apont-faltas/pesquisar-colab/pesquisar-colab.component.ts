import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RhService } from 'src/app/services/rh.service';
import { ApontFaltasComponent } from '../apont-faltas.component';

@Component({
  selector: 'app-pesquisar-colab',
  templateUrl: './pesquisar-colab.component.html',
  styleUrls: ['./pesquisar-colab.component.scss']
})
export class PesquisarColabComponent implements OnInit {
  @Output() value: EventEmitter<any> = new EventEmitter()
  colabAtivo: any[] = []
  colabOriginal: any[] = []
  constructor(
    protected rhService: RhService
  ) { }

  ngOnInit(): void {
    this.rhService.find().subscribe((data: any)=>{
      for(let value in data){
        if(data[value]['disabled']==false){
          this.colabAtivo.push(data[value])
          this.colabOriginal.push(data[value])
        }
      }
    })
  }
  filterBefore = "";
  filtrar(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.colabAtivo = this.colabOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.colabAtivo = this.colabOriginal;
        this.colabAtivo = this.colabOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.colabAtivo = this.colabOriginal;
    }
  }

}
