import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
