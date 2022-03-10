import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContasPagarService {
  contas: any = [];

  constructor(private readonly http: HttpClient) {}

  find() {
    return this.http.get<any>(environment.apiUrl + 'contas-pagar');
  }

  findPromise() {
    return this.http.get<any>(environment.apiUrl + 'contas-pagar').toPromise();
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'contas-pagar', data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}contas-pagar/${id}`);
  }

  update(id: number, data: any) {
    return this.http.patch(environment.apiUrl + 'contas-pagar/' + id, data);
  }
}
