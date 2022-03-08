import { Component, OnInit } from '@angular/core';

import {MensagemService} from 'src/app/services/mensagem.service'
import Swal from 'sweetalert2';
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
      console.log(res)
      this.mensagens = res
    })
  }

  viewMessage(mensagem: any){
    console.log(mensagem);
  }

  deleteMessage(mensagem: any){
    this.mensagemService.delete(mensagem.id).subscribe(() => {
      this.getMessages();
      return Swal.fire({
        title: 'Mensagem Deletada!',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    })
  }

}
