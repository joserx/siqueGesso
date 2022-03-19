import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  public cards = [
    { nome: "Vendas", icon: "bi-cash-coin", href: "/sistema/vendas/pedidos" },
    { nome: "Vendas Diretas", icon: "bi-truck", href: "/sistema/vendas/vendas-diretas/listar" },
    { nome: "Clientes", icon: "bi-person-circle", href: "/sistema/vendas/clientes" },
  ]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_ver) == PermissionsUsers.vendas_ver)){
      this.router.navigate(['sistema'])
    }
  }

}
