import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  socket: any;
  notifications: any = [];

  constructor(private readonly http: HttpClient) {
    this.socket = io('https://api.sistemasiquegesso.com.br/');

    // http://localhost:25565
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.notifications.push(data)
    this.socket.emit(eventName, data);
  }


  find() {
    return this.http.get<any>(environment.apiUrl + 'mensagens/');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'mensagens/', data);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}mensagens/${id}`);
  }

  update(id: number, data: any) {
    return this.http.patch(environment.apiUrl + 'mensagens/' + id, data);
  }
}
