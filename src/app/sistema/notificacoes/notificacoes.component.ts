import { Component, OnInit } from '@angular/core';

import {MensagemService} from 'src/app/services/mensagem.service'
@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss'],
})
export class NotificacoesComponent implements OnInit {
  public mensagens: any;

  constructor(
    private mensagemService: MensagemService
  ) {}

  ngOnInit(): void {
    this.getMessages()
  }

  getMessages(){
    this.mensagemService.find().subscribe((res)=>{
      this.mensagemService.notifications = res;
      this.mensagens = res
    })
  }
}
