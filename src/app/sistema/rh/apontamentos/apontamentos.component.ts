import { Component, OnInit } from '@angular/core';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-apontamentos',
  templateUrl: './apontamentos.component.html',
  styleUrls: ['./apontamentos.component.scss']
})
export class ApontamentosComponent implements OnInit {

  public cards = [
    { nome: "Faltas", icon: "bi bi-list-ol", href: "/sistema/rh/faltas" },
    { nome: "Ausência", icon: "bi bi-person-lines-fill", href: "/sistema/rh/ausencia" },
  ]
  router: any;

  constructor() { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.rh_ver) == PermissionsUsers.rh_ver)){
      this.router.navigate(['sistema','rh'])
    }
  }

}
