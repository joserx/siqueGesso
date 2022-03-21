import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PermissionsService } from 'src/app/services/permissions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permissoes',
  templateUrl: './permissoes.component.html',
  styleUrls: ['./permissoes.component.scss']
})
export class PermissoesComponent implements OnInit, OnChanges {

  permissions: any = []
  permissionId: number
  constructor(
    private readonly permissionService: PermissionsService
  ) { }

  ngOnInit(): void {
    this.permissionService.find().subscribe((data:any)=>{
      console.log(data)
      this.permissions = data
    })
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.permissions = changes.permissions.currentValue
    console.log(this.permissions)
  }

  changeId(value:number){
    this.permissionId = value
  }

  filterBefore = "";

  filtrar(event : any) {
    let str = event.target.value;
    // if(str != '') {
    //   if(str.length > this.filterBefore.length) {
    //     this.usuarios = this.usuariosOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
    //     this.filterBefore = str
    //   } else {
    //     this.usuarios = this.usuariosOriginal;
    //     this.usuarios = this.usuariosOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
    //     this.filterBefore = str
    //   }
    // } else {
    //   this.usuarios = this.usuariosOriginal;
    // }
  }

  delete(id:number){

    Swal.fire({
      title: 'Você gostaria de deletar essa permissão ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.permissionService.delete(id).subscribe(()=>{
          this.permissionService.find().subscribe((data:any)=>{
            this.permissions = data
          })
        })
        Swal.fire({
          title: '<h4>Permissão Deletada!</h4>',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          width: '500px',
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: '<h4>A permissão não foi deletada!</h4>',
          icon: 'info',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          width: '500px',
        });
      }
    });


    
  }

}
