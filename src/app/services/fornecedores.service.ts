import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  fornecedores: any;

  constructor(private readonly http: HttpClient) {}

  find() {
    return this.http.get(environment.apiUrl + 'provider');
  }

  create(payload: any) {
    return this.http.post(`${environment.apiUrl}provider/`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}provider/${id}`);
  }

  updateCep(cep: string) {
    return new Observable((x) => {
      var request = new XMLHttpRequest();
      request.open('get', `https://viacep.com.br/ws/${cep}/json/`, true);
      request.send();
      request.onload = function () {
        var data = JSON.parse(this.response);
        x.next(data);
      };
    });
  }
}
