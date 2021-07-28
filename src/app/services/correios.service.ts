import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorreiosService {

  constructor(
    private readonly http : HttpClient
  ) { }

  consultaCep(cep : string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  } 
}
