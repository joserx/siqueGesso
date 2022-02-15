import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public notificacoes: any = [];

  public user: any = {};
  avatarImg = 'assets/sique-gesso-favicon.png';

  constructor(
    private readonly authService: AuthenticationService,
    private readonly MensagemService: MensagemService
  ) {}

  ngOnInit(): void {
    this.MensagemService.listen('message').subscribe((data: any) => {
      this.notificacoes.push(data);
    });

    this.authService.currentUser.subscribe((user) => {
      this.user = user.result;
      if (this.user.avatar) {
        this.avatarImg =
          environment.apiUrl + 'file/download/' + this.user.avatar.fileName;
      }
    });
  }
}
