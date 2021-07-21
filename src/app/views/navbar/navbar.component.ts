import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

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

  public user: any = {};
  avatarImg = 'assets/sem-foto.jpg'

  constructor(
    private readonly authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.user = user.result
      if (this.user.avatar) {
        this.avatarImg = environment.apiUrl + 'file/download/' + this.user.avatar.fileName
      }
    })
  }

}
