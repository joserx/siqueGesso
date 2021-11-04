import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

  constructor(
    private readonly http: HttpClient
  ) { }

  create(data:any){
    return this.http.post(environment.apiUrl + 'veiculos', data)
  }

  find(){
    return this.http.get(environment.apiUrl + 'veiculos')
  }

  findOne(id:number){
    return this.http.get(environment.apiUrl + 'veiculos/' + id)
  }

  update(id: number, data: any){
    return this.http.patch(environment.apiUrl + 'veiculos/' + id, data)
  }

}
