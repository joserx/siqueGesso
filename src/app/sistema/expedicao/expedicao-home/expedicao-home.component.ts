import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-expedicao-home',
  templateUrl: './expedicao-home.component.html',
  styleUrls: ['./expedicao-home.component.scss']
})
export class ExpedicaoHomeComponent implements OnInit {

  public cards = [
    { nome: "Solicitação de pedido", icon: "bi-bell-fill", href: "//sistema/expedicao/solicitacao" },
    { nome: "Lista e embarque", icon: "bi-list-ol", href: "//sistema/expedicao/lista" },
    { nome: "Consulta status", icon: "bi-search", href: "//sistema/expedicao/consulta" },
    { nome: "Cadastro", icon: "bi-person-lines-fill", href:"//sistema/expedicao/cadastro" },
    { nome: "Não conform. e status", icon: "bi-card-text", href:"//sistema/expedicao/status" },
    { nome: "Baixa de entrega", icon: "bi-box-seam", href:"//sistema/expedicao/baixa" }
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.expedicao_ver) == PermissionsUsers.expedicao_ver)){
      this.router.navigate(['sistema'])
    }
  }

}
