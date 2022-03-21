import { Component, OnInit } from '@angular/core';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { RhService } from 'src/app/services/rh.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filtrar-colaboradores',
  templateUrl: './filtrar-colaboradores.component.html',
  styleUrls: ['./filtrar-colaboradores.component.scss'],
})
export class FiltrarColaboradoresComponent implements OnInit {
  public colaboradores: any[] = [];
  public colaboradoresOriginal: any[] = [];
  public data: any = {};
  edit: any = false
  delete: any = false

  constructor(public readonly rhService: RhService) {}

  ngOnInit(): void {
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.rh_editar) == PermissionsUsers.rh_editar){
      this.edit = true
    }
    if(((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.rh_excluir) == PermissionsUsers.rh_excluir)){
      this.delete = true
    }
    this.rhService.find().subscribe((data: any) => {
      this.colaboradores = data;
      this.colaboradoresOriginal = data;
    });
  }

  filtrarDepartamento(event: any) {
    const departamento = event.target.value;
    console.log(this.colaboradoresOriginal);

    if (departamento) {
      this.colaboradores = this.colaboradoresOriginal.filter((colaborador) =>
        colaborador.department.includes(departamento)
      );
    } else {
      this.colaboradores = this.colaboradoresOriginal;
    }
  }

  filtrarLoja(event: any) {
    const filial = event.target.value;
    console.log(filial);

    if (filial) {
      this.colaboradores = this.colaboradoresOriginal.filter((colaborador) =>
        colaborador.filial.includes(filial)
      );
    } else {
      this.colaboradores = this.colaboradoresOriginal;
    }
  }

  deleteRh(id: number) {
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
          timerProgressBar: true,
          width: '500px',
        });
        this.rhService.delete(id).subscribe((data: any) => {
          this.colaboradores = this.colaboradores.filter((ele: any) => {
            return ele.id != id;
          });
          this.rhService.data().subscribe((data: any) => {
            this.data = data;
          });
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: '<h4>O colaborador não foi deletado!</h4>',
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
