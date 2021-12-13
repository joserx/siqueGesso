import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  produtos: any[];

  constructor(private readonly http: HttpClient) {}

  find() {
    return this.http.get<any>(environment.apiUrl + 'produtos');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'produtos', data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}produtos/${id}`);
  }
  update(id: number, data: any) {
    return this.http.patch(environment.apiUrl + 'produtos/' + id, data);
  }
}
