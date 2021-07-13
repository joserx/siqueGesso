import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioSistemaService {

  constructor(
    private readonly http : HttpClient 
  ) { }

  find() {
    return this.http.get(environment.apiUrl + 'user');
  }

  findOne(id : number) {
    return this.http.get(environment.apiUrl + 'user/' + id);
  }

  create(data : any) {
    return this.http.post(environment.apiUrl + 'user/', data);
  }

  delete(id : number) {
    return this.http.delete(environment.apiUrl + 'user/' + id);
  }

  update(id : number, data : any) {
    return this.http.put(environment.apiUrl + 'user/' + id, data)
  }



}
