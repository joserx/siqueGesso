import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItensPedidosService {

  constructor(
    private readonly http: HttpClient
  ) { }

  create(data:any){
    return this.http.post(environment.apiUrl + 'item-pedidos', data)
  }

  find(){
    return this.http.get(environment.apiUrl + 'item-pedidos')
  }

  update(data: any, id: number){
    return this.http.patch(environment.apiUrl + 'item-pedidos/' +id, data)
  }

  delete(id: number){
    return this.http.delete(environment.apiUrl + 'item-pedidos/' + id)
  }
  
  findOne(id: number){
    return this.http.get(environment.apiUrl + 'item-pedidos/' + id)
  }
}
