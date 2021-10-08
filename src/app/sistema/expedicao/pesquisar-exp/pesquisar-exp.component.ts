import { Component, OnInit } from '@angular/core';
import { ExpedicaoService } from 'src/app/services/expedicao.service';


@Component({
  selector: 'app-pesquisar-exp',
  templateUrl: './pesquisar-exp.component.html',
  styleUrls: ['./pesquisar-exp.component.scss']
})
export class PesquisarExpComponent implements OnInit {

  /* 
  ::::::::::::::::::::::::::::::
  ::-----------vars-----------::
  ::::::::::::::::::::::::::::::
  */

  public expedicoes: any = []
  public expedicoesOriginais: any = []



  /* 
  :::::::::::::::::::::::::::::
  ::-------constructor-------::
  :::::::::::::::::::::::::::::
  */

  constructor(
    private readonly expedicaoService: ExpedicaoService
  ) { }



  /* 
  :::::::::::::::::::::::::::::
  ::---------methods---------::
  :::::::::::::::::::::::::::::
  */


  ngOnInit(): void {
    this.expedicaoService.find().subscribe((data:any)=>{
      this.expedicoes = data
      this.expedicoesOriginais = data
    })
  }

  filterBefore = "";
  filtrar(event: any){
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.expedicoes = this.expedicoesOriginais.filter((user : any) => `${user.emissao.substring(10, 0)} ${user.codigo} ${user.pedido} ${user.despacho} ${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.expedicoes = this.expedicoesOriginais;
        this.expedicoes = this.expedicoesOriginais.filter((user : any) => `${user.emissao.substring(10, 0)} ${user.codigo} ${user.pedido} ${user.despacho} ${user.status}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.expedicoes = this.expedicoesOriginais;
    }
  }



}
