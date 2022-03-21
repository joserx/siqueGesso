import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class ConfiguracoesComponent implements OnInit {
  public cards = [
    {
      nome: 'Usuários do sistema',
      icon: 'bi-people',
      href: '/sistema/usuarios-sistema/listar',
    },
    { nome: 'Permissões', icon: 'bi-shield-check', href: '/sistema/configuracoes/permissoes' },
    { nome: 'Mensagens', icon: 'bi-envelope', href: '/sistema/notificacoes' },
    {
      nome: 'Cadastro de loja',
      icon: 'bi-building',
      href: '/sistema/configuracoes/lojas-cadastradas/lista',
    },
    {
      nome: 'Cadastro de categorias',
      icon: 'bi-tags',
      href: '/sistema/configuracoes/cadastro-de-categorias',
    },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.config_ver) == PermissionsUsers.config_ver)){
      this.router.navigate(['sistema'])
    }
  }
}
