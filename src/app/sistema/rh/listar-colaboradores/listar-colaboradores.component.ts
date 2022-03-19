import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import { RhService } from 'src/app/services/rh.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-colaboradores',
  templateUrl: './listar-colaboradores.component.html',
  styleUrls: ['./listar-colaboradores.component.scss'],
})
export class ListarColaboradoresComponent implements OnInit {
  profiles: any[] = [];
  profilesFiltrados: any[] = [];
  data: any = {};

  public p: number = 1;
  public pages: any[] = [];
  public pagesNumber: number;
  public atualPageNumber: number = 0;
  public atualPage: any[] = [];
  edit: any = false
  delete: any = false

  constructor(
    public rhService: RhService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPerfis();
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.rh_editar) == PermissionsUsers.rh_editar){
      this.edit = true
    }
    if(((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.rh_excluir) == PermissionsUsers.rh_excluir)){
      this.delete = true
    }
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.rh_ver) == PermissionsUsers.rh_ver)){
      this.router.navigate(['sistema'])
    }
  }

  getPerfis(disabled?: boolean) {
    this.rhService.find(disabled).subscribe(
      (rhs: any) => {
        this.profiles = rhs;
      },
      (err) => {},
      () => {}
    );
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
          this.profiles = this.profiles.filter((ele: any) => {
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
