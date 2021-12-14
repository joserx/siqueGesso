import { Component, OnInit } from '@angular/core';
import { RhService } from 'src/app/services/rh.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-colaboradores',
  templateUrl: './listar-colaboradores.component.html',
  styleUrls: ['./listar-colaboradores.component.scss']
})
export class ListarColaboradoresComponent implements OnInit {

  profiles: any[] = [];
  data: any = {}
  public pages: any[] = []
  public pagesNumber: number
  public atualPageNumber: number = 0
  public atualPage: any[] = []


  constructor(
    public  rhService: RhService
  ) { }

  ngOnInit(): void {
    this.rhService.find().subscribe((rhs: any) => {
      this.profiles = rhs
      console.log(this.profiles)
    }, (err)=>{
      console.log(err)
    }, ()=>{
      for(let control = 0; control <= this.profiles.length; control++){
        this.rhService.findByPage(control).subscribe((data:any)=>{
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
    this.rhService.findByPage(0).subscribe((data:any)=>{
      this.atualPage = data
    })
    this.rhService.data().subscribe((data: any) => {
      this.data = data;
    })
  }

  deleteRh(id : number) {
    Swal.fire({
      title: 'Você gostaria de deletar esse colaborador ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({ 
          title: '<h4>Colaborador Deletado!</h4>', 
          icon: 'success', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true ,
          width: '500px'
        })
        this.rhService.delete(id).subscribe((data : any) => {
          this.profiles = this.profiles.filter((ele : any) => { return ele.id != id })
          this.rhService.data().subscribe((data: any) => {
            this.data = data;
          })
        })
      } else if (result.isDenied) {
        Swal.fire({ 
          title: '<h4>O colaborador não foi deletado!</h4>', 
          icon: 'info', 
          toast: true, 
          position: 'top', 
          showConfirmButton: false, 
          timer: 2000, 
          timerProgressBar: true ,
          width: '500px'
        })
      }
    })
  }

  proximo(){
    if(this.atualPageNumber < (Object.keys(this.pages).length - 1)){
      this.atualPageNumber++
      this.rhService.findByPage(this.atualPageNumber).subscribe((data:any)=>{
        this.atualPage = data
      })
    }
  }
  anterior(){
    console.log(Object.keys(this.pages).length - 1)
    if(this.atualPageNumber <= (Object.keys(this.pages).length - 1) && this.atualPageNumber > 0){
      this.atualPageNumber--
      this.rhService.findByPage(this.atualPageNumber).subscribe((data:any)=>{
        this.atualPage = data
      })
    }
  }

}
