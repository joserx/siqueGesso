import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public cards = [
    { nome: "Motorista", icon: "bi-person-circle", href: "//sistema/expedicao/cadastro/motorista" },
    { nome: "Veículo", icon: "bi-truck", href: "//sistema/expedicao/cadastro/veiculo" },
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_editar) == PermissionsUsers.expedicao_editar)){
      this.router.navigate(['sistema'])
    }
  }

}
