import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewMsgComponent } from './view-msg/view-msg.component';

import { MensagemService } from 'src/app/services/mensagem.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.scss'],
})
export class NotificacoesComponent implements OnInit {
  @ViewChild(ViewMsgComponent)
  viewMsgComponent: ViewMsgComponent;

  public mensagens: any;

  constructor(private mensagemService: MensagemService) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages() {
    this.mensagemService.find().subscribe((res) => {
      this.mensagemService.notifications = res;
      this.mensagens = res;
    });
  }

  loadViewMessages(mensagem: any) {
    this.viewMsgComponent.loadForm(mensagem);
  }

  deleteMessage(mensagem: any) {
    Swal.fire({
      title: `Deseja deletar ${mensagem.titulo}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
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
        });
      else
        Swal.fire({
          title: 'Ação cancelada!',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
    });
  }
}
