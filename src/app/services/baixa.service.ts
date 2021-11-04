import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaixaService {

  constructor(
    private readonly http: HttpClient
  ) { }

  find(){
    return this.http.get(environment.apiUrl + 'baixa/')
  }

  findOne(id: number){
    return this.http.get(environment.apiUrl + 'baixa/' + id)
  }

  create(data: any){
    return this.http.post(environment.apiUrl + 'baixa/', data)
  }

  delete(id: number){
    return this.http.delete(environment.apiUrl + 'baixa/' + id)
  }

  update(id: number, data: any){
    return this.http.patch(environment.apiUrl + 'baixa/' + id, data)
  }

}
