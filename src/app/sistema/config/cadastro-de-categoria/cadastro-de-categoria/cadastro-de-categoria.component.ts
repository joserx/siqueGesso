import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-cadastro-de-categoria',
  templateUrl: './cadastro-de-categoria.component.html',
  styleUrls: ['./cadastro-de-categoria.component.scss'],
})
export class CadastroDeCategoriaComponent implements OnInit {
  public cards = [
    {
      nome: 'Categoria de produtos',
      icon: 'bi-list-check',
      href: '/sistema/configuracoes/cadastro-de-categorias/categoria-de-produto',
    },
    {
      nome: 'Destinação de venda',
      icon: 'bi-cart-check',
      href: '/sistema/configuracoes/cadastro-de-categorias/destinacao-de-venda',
    },
    {
      nome: 'Categoria de Fornecedores',
      icon: 'bi-building',
      href: '/sistema/configuracoes/cadastro-de-categorias/categoria-fornecedor',
    },
    {
      nome: 'Condições de Pagamento',
      icon: 'bi-list-check',
      href: '/sistema/configuracoes/cadastro-de-categorias/condicoes-pagamento',
    },
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.config_ver) == PermissionsUsers.config_ver)){
      this.router.navigate(['sistema'])
    }
  }
}
