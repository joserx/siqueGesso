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

}
