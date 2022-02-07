import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DestinacaoVendaService {
  constructor(private readonly http: HttpClient) {}
  public destinacoes: any;

  find(status: any = false) {
    return this.http.get(environment.apiUrl + 'destinacao-vendas', {
      params: { status },
    });
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'destinacao-vendas/', data);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + 'destinacao-vendas/' + id);
  }

  update(id: number, data: any) {
    return this.http.patch(
      environment.apiUrl + 'destinacao-vendas/' + id,
      data
    );
  }
}
