import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  pedidos: any[];

  constructor(private readonly http: HttpClient) {}

  find() {
    return this.http.get<any>(environment.apiUrl + 'pedidos/');
  }

  findResumo(id: number){
    return this.http.get(environment.apiUrl + 'pedidos/resumo/' + id)
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'pedidos', data);
  }

  update(id: number, data: any) {
    return this.http.patch(environment.apiUrl + 'pedidos/' + id, data);
  }

  findOne(id: number) {
    return this.http.get(environment.apiUrl + 'pedidos/' + id);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + 'pedidos/' + id);
  }

  findByPage(no: any, data: any ) {
    return this.http.post(environment.apiUrl + 'pedidos/page/' + no, data);
  }

  findThis(id: number) {
    return this.http.get(environment.apiUrl + 'pedidos/find/' + id);
  }
}
