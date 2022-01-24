import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaProdutoService {
  constructor(private readonly http: HttpClient) {}
  public categoria: any;

  find() {
    return this.http.get(environment.apiUrl + 'categoria-produto');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'categoria-produto/', data);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + 'categoria-produto/' + id);
  }

  update(id: number, data: any) {
    return this.http.put(environment.apiUrl + 'categoria-produto/' + id, data);
  }
}
