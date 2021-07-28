import { Component, OnInit } from '@angular/core';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema.service';

@Component({
  selector: 'app-listar-usuarios-sistema',
  templateUrl: './listar-usuarios-sistema.component.html',
  styleUrls: ['./listar-usuarios-sistema.component.scss'],
})
export class ListarUsuariosSistemaComponent implements OnInit {

  usuarios : any;
  usuariosOriginal : any;

  constructor(
    private readonly usuarioSistemasService : UsuarioSistemaService
  ) { }

  ngOnInit(): void {
    this.usuarioSistemasService.find().subscribe((data : any) => {
      this.usuarios = data
      this.usuariosOriginal = data
    })
  }

  deleteUser(id : number) {
    this.usuarioSistemasService.delete(id).subscribe((data : any) => {
      this.usuarios = this.usuarios.filter((ele : any) => { return ele.id != id })
    })
  }

  filterBefore = "";

  filtrar(event : any) {
    let str = event.target.value;
    if(str != '') {
      if(str.length > this.filterBefore.length) {
        this.usuarios = this.usuariosOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      } else {
        this.usuarios = this.usuariosOriginal;
        this.usuarios = this.usuariosOriginal.filter((user : any) => `${user.name} ${user.surname}`.toUpperCase().includes(str.toUpperCase()))
        this.filterBefore = str
      }
    } else {
      this.usuarios = this.usuariosOriginal;
    }
  }

}
