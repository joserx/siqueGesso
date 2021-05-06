import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-usuario-sistema',
  templateUrl: './editar-usuario-sistema.component.html',
  styleUrls: ['./editar-usuario-sistema.component.scss']
})
export class EditarUsuarioSistemaComponent implements OnInit {
  
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const usuarioId = Number(routeParams.get('id'));
    console.log(usuarioId);
  }

}
