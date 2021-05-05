import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  public menu = false;
  public menuActive = '';

  public navItems = [
    { nome: "home", icon: "bi-house-door", href: "/sistema/home", subMenus: [] },
    {
      nome: "configuracoes", icon: "bi-gear", href: null, subMenus: [
        {
          titulo: "Usuário", descricao: "Liste, crie, edite ou remova os usuários do sistema.", paginas: [
            { nome: 'Usuários do sistema', href: "/sistema/config/usuarios-sistema" },
            { nome: 'Permissões', href: "/sistema/config/permissoes" },
          ]
        },
        {
          titulo: "Notificações", descricao: "Configure as notificações do sistema.", paginas: [
            { nome: 'Definir notificações', href: "/sistema/config/notificacoes" }
          ]
        },
      ]
    },
    { nome: "info", icon: "bi-info-circle", href: "/sistema/info", subMenus: [] }
  ]

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {

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

}
