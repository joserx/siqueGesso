import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  constructor(private readonly http: HttpClient) {}

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
