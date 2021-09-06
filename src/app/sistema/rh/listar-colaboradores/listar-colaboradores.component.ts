import { Component, OnInit } from '@angular/core';
import { RhService } from 'src/app/services/rh.service';

@Component({
  selector: 'app-listar-colaboradores',
  templateUrl: './listar-colaboradores.component.html',
  styleUrls: ['./listar-colaboradores.component.scss']
})
export class ListarColaboradoresComponent implements OnInit {

  profiles: any[] = [];
  data: any = {}

  constructor(
    public  rhService: RhService
  ) { }

  ngOnInit(): void {
    this.rhService.find().subscribe((rhs: any) => {
      this.profiles = rhs
      console.log(this.profiles)
    })
    this.rhService.data().subscribe((data: any) => {
      this.data = data;
    })
  }

  deleteRh(id : number) {
    this.rhService.delete(id).subscribe((data : any) => {
      this.profiles = this.profiles.filter((ele : any) => { return ele.id != id })
      this.rhService.data().subscribe((data: any) => {
        this.data = data;
      })
    })
  }

}
