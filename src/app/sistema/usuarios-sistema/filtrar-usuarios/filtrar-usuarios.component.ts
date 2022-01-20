import { Component, OnInit } from '@angular/core';

import { UsuarioSistemaService } from 'src/app/services/usuario-sistema.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filtrar-usuarios',
  templateUrl: './filtrar-usuarios.component.html',
  styleUrls: ['./filtrar-usuarios.component.scss'],
})
export class FiltrarUsuariosComponent implements OnInit {
  usuarios: any;
  usuariosOriginal: any = [];

  constructor(private readonly usuarioSistemasService: UsuarioSistemaService) {}

  ngOnInit(): void {
    this.usuarioSistemasService.find().subscribe((data: any) => {
      this.usuarios = data;
      this.usuariosOriginal = data;
    });
  }

  filtrarPermissao(event: any) {
    const permission = event.target.value;
    if (permission) {
      this.usuarios = this.usuariosOriginal.filter(
        (usuario: any) => usuario.permission == permission
      );
    } else {
      this.usuarios = this.usuariosOriginal;
    }
  }

  deleteUsuario(id: number) {
    this.usuarioSistemasService.delete(id).subscribe((data: any) => {
      Swal.fire({
        title: 'Usuário deletado com sucesso!',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      this.usuarios = this.usuarios.filter((ele: any) => {
        return ele.id != id;
      });
    });
  }
}
