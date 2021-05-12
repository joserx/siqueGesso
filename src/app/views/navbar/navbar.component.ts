import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public notificacoes: any = [
    { id: 1, texto: 'Isso é um exemplo de notificação. Ela aparecerá assim como este texto na qual você está lendo.', href: '' },
    { id: 2, texto: 'Isso é um outro exemplo de notificação. Ela aparecerá assim como este texto na qual você está lendo.', href: '' },
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
