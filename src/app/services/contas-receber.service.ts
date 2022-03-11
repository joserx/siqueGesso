import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContasReceberService {
  contas: any = [];

  constructor(private readonly http: HttpClient) {}

  find() {
    return this.http.get<any>(environment.apiUrl + 'contas-receber');
  }

  findPromise() {
    return this.http
      .get<any>(environment.apiUrl + 'contas-receber')
      .toPromise();
  }

  data() {
    return this.http.get(environment.apiUrl + 'contas-pagar/data');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'contas-receber', data);
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}contas-receber/${id}`);
  }

  update(id: number, data: any) {
    return this.http.patch(environment.apiUrl + 'contas-receber/' + id, data);
  }
}
