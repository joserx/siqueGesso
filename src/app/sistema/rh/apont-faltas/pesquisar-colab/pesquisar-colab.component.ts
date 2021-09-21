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
  name: any
  surname: any
  colab: any
  colabOriginal: any
  constructor(
    protected rhService: RhService
  ) { }

  ngOnInit(): void {
    this.rhService.find().subscribe((data: any)=>{
      this.colab = data
      this.colabOriginal = data
    })
  }
  filterBefore = "";
  filtrar(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.colab = this.colabOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.colab = this.colabOriginal;
        this.colab = this.colabOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.colab = this.colabOriginal;
    }
  }

}
