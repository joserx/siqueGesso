import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ContasPagarService{
  contas: any =[]


  constructor(private readonly http: HttpClient) {}

  find() {
    return this.http.get<any>(environment.apiUrl + 'contas-pagar');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'contas-pagar', data);
  }
  delete(produto: any) {
    return this.http.patch(`${environment.apiUrl}contas-pagar/delete`, produto);
  }

  update(id: number, data: any) {
    return this.http.patch(environment.apiUrl + 'contas-pagar/' + id, data);
  }
}
