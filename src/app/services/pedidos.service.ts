import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private readonly http: HttpClient
  ){ }

  find(){
    return this.http.get(environment.apiUrl + 'pedidos/')
  }

  create(data: any){
    return this.http.post(environment.apiUrl + 'pedidos', data)
  }

  update(id:number, data: any){
    return this.http.patch(environment.apiUrl + 'pedidos/' + id, data)
  }

  findOne(id: number){
    return this.http.get(environment.apiUrl + 'pedidos/' + id)
  }

  delete(id:number){
    return this.http.delete(environment.apiUrl + 'pedidos/' + id)
  }

  findByPage(no: number){
    return this.http.get(environment.apiUrl + 'pedidos/page/' + no)
  }
}
