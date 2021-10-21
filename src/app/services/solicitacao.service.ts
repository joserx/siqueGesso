import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  constructor(
    private readonly http: HttpClient
  ) { }

  create(data: any){
    return this.http.post(environment.apiUrl + 'solicitacao', data)
  }

  find(){
    return this.http.get(environment.apiUrl + 'solicitacao/')
  }

  findOne(id: number){
    return this.http.get(environment.apiUrl + 'solicitacao/' +id)
  }
}
