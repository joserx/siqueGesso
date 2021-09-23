import { Component, OnInit } from '@angular/core';
import { RhService } from 'src/app/services/rh.service';

@Component({
  selector: 'app-controle-vt',
  templateUrl: './controle-vt.component.html',
  styleUrls: ['./controle-vt.component.scss']
})
export class ControleVtComponent implements OnInit {

  colabOriginal: any
  public colab: any[] = []
  constructor(
    private rhService: RhService
  ) { }

  ngOnInit(): void {
    this.rhService.find().subscribe((data: any)=>{
      this.colab = data
      this.colabOriginal = data
    })
    console.log(this.colab)
  }
  
}
