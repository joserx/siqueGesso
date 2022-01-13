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
    return this.http.get<any>(environment.apiUrl + 'pedido-compra/');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'pedido-compra', data);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}pedido-compra/${id}`);
  }
}
