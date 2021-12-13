import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoCompraService {
  pedidos: any[];
  constructor(private readonly http: HttpClient) {}

  find() {
    return this.http.get<any>(environment.apiUrl + 'pedidos-compra/');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'pedidos-compra', data);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + 'pedidos-compra/' + id);
  }
}
