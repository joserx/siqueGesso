import { Component, OnInit } from '@angular/core';
import { ExpedicaoService } from 'src/app/services/expedicao.service';

@Component({
  selector: 'app-expedicao',
  templateUrl: './expedicao.component.html',
  styleUrls: ['./expedicao.component.scss']
})
export class ExpedicaoComponent implements OnInit {

  /* 
  ::::::::::::::::::::::::::::::
  ::-----------vars-----------::
  ::::::::::::::::::::::::::::::
  */

  public ordens: any = []
  public pages: any[] = []
  public pagesNumber: number
  public atualPageNumber: number = 0
  public atualPage: any[] = []
  
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
      this.ordens = data
    }, (err)=>{
      console.log(err)
    }, ()=>{
      for(let control = 0; control <= this.ordens.length; control++){
        this.expedicaoService.findByPage(control).subscribe((data:any)=>{
          if(data.length > 0){
            this.pages.push(data)
          }
        }, (err)=>{
          console.log(err)
        }, ()=>{
          this.pagesNumber = Object.keys(this.pages).length
        })
      }
    })
    this.expedicaoService.findByPage(0).subscribe((data:any)=>{
      this.atualPage = data
    })
  }

  proximo(){
    if(this.atualPageNumber < (Object.keys(this.pages).length - 1)){
      this.atualPageNumber++
      this.expedicaoService.findByPage(this.atualPageNumber).subscribe((data:any)=>{
        this.atualPage = data
      })
    }
  }
  anterior(){
    console.log(Object.keys(this.pages).length - 1)
    if(this.atualPageNumber <= (Object.keys(this.pages).length - 1) && this.atualPageNumber > 0){
      this.atualPageNumber--
      this.expedicaoService.findByPage(this.atualPageNumber).subscribe((data:any)=>{
        this.atualPage = data
      })
    }
  }
  // Page number - 1 page number + 1, mas n pode ser menor que 0 e maior que o page number 

}
