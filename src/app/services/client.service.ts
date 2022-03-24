import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientes: any;


  constructor(
    private readonly http: HttpClient
  ) { }

  find() {
    return this.http.get(environment.apiUrl + 'client');
  }

  findOne(id: number) {
    return this.http.get(environment.apiUrl + 'client/' + id);
  }

  data() {
    return this.http.get(environment.apiUrl + 'client/data');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'client/', data);
  }

  update(id: number, data: any) {
    return this.http.patch(environment.apiUrl + 'client/' + id, data);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + 'client/' + id);
  }

  findByPage(no: number){
    return this.http.get(environment.apiUrl + 'client/page/' + no)
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
