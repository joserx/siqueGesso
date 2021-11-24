import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoGeradoService {

  constructor(
    private readonly http: HttpClient
  ) { }

  create(data: any){
    return this.http.post(environment.apiUrl + 'pedido-gerado', data)
  }

}
