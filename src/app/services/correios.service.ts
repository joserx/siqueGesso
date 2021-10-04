import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {

  constructor(
    private readonly http : HttpClient
  ) { }

  consultaCep(cep : string) {
    // return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
    return new Observable((x) => {
      const request = new XMLHttpRequest();
      request.open('get', `https://viacep.com.br/ws/${cep}/json/`, true);
      request.send();
      request.onload = function() {
          const data = JSON.parse(this.response);
          x.next(data);
      };
  });
  } 
}
