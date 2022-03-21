import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  public menu = false;
  public menuActive = '';
  currentUser: any
  public navItems = [
    { nome: 'Home', icon: 'bi-house-door', href: '/sistema/home', subMenus: [], condition: true},
    { nome: "Vendas", icon: "bi-shop", href: "/sistema/vendas", condition: true},
    { nome: "Compras", icon: "bi-cart4", href: "/sistema/compras", condition: true},
    { nome: "Estoque", icon: "bi-box-seam", href: "/sistema/estoque", condition: true},
    { nome: "Financeiro", icon: "bi-file-earmark-bar-graph", href: "/sistema/financeiro", condition: true},
    { nome: "Expedição", icon: "bi-truck", href: "/sistema/expedicao", condition: true},
    { nome: "RH", icon: "bi-person-lines-fill", href: "/sistema/rh", condition: true},
    { nome: 'Configurações',  icon: 'bi-gear', href: '/sistema/configuracoes', condition: false},
    // { nome: 'configuracoes', icon: 'bi-gear', href: null, subMenus: [
    //     { titulo: 'Usuário', descricao: 'Liste, crie, edite ou remova os usuários do sistema.', paginas: [
    //         { nome: 'Usuários do sistema', href: '/sistema/usuarios-sistema' },
    //         { nome: 'Permissões', href: '/sistema/usuarios-sistema/permissoes' },
    //       ]
    //     },
    //     { titulo: 'Notificações', descricao: 'Configure as notificações do sistema.', paginas: [
    //         { nome: 'Definir notificações', href: '/sistema/notificacoes' }
    //       ]
    //     },
    //     { titulo: '', descricao: '', paginas: [
    //       { nome: 'Configurações', href: '/sistema/configuracoes'},
    //       { nome: 'Sair', href: '/logout'},
    //     ]}
    //   ]
    // },
    // { nome: 'info', icon: 'bi-info-circle', href: '/sistema/info', subMenus: [] },
    { nome: 'Sair', icon: 'bi-arrow-bar-left', href: '/logout', condition: true},
  ]

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as any).result
    if((this.currentUser.permission.permission & PermissionsUsers.config_ver) == PermissionsUsers.config_ver){
      for(let item of this.navItems){
        if(item.condition == false){
          item.condition = true
        }
      }
    }
  }

  toggleMenu(menuActive: string, href: any = null) {
    // Verifica se o sidemenu dinâmico já está aberto
    if (menuActive == this.menuActive) {
      // Se estiver aberto, ele fechará e limpará o menu ativo
      this.menu = false;
      this.menuActive = '';
    } else {
      // Se estiver fechado, verificar o href
      if (href == null) {
        // Se for null, então deve abrir o sidemenu dinânico
        this.menuActive = menuActive;
        (this.menu == false) ? this.menu = true : this.menu;
      } else {
        // Se não for null, fechar o menu e redirecionar
        this.menu = false;
        this.menuActive = '';
        this.router.navigateByUrl(href);
      }
    }
  }

  showMenu(){
    this.menu = true
  }

  hideMenu(){
    this.menu = false
  }

}
