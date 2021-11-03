import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private readonly http : HttpClient
  ) { }

  find() {
    return this.http.get(environment.apiUrl + 'produtos/');
  }

  create(payload: any){
    return this.http.post(`${environment.apiUrl}produtos/`, payload)
  }
  
}
