import { Component, OnInit } from '@angular/core';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema.service';

@Component({
  selector: 'app-listar-usuarios-sistema',
  templateUrl: './listar-usuarios-sistema.component.html',
  styleUrls: ['./listar-usuarios-sistema.component.scss'],
})
export class ListarUsuariosSistemaComponent implements OnInit {

  usuarios : any;

  constructor(
    private readonly usuarioSistemasService : UsuarioSistemaService
  ) { }

  ngOnInit(): void {
    this.usuarioSistemasService.find().subscribe((data : any) => {
      this.usuarios = data
    })
  }

  deleteUser(id : number) {
    this.usuarioSistemasService.delete(id).subscribe((data : any) => {
      this.usuarios = this.usuarios.filter((ele : any) => { return ele.id != id })
    })
  }

}
