import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmbarqueService {

  constructor(
    private readonly http: HttpClient
  ) { }

  find(){
    return this.http.get(environment.apiUrl + 'embarque')
  }

  create(data: any){
    return this.http.post(environment.apiUrl + 'embarque', data)
  }

  delete(id: number){
    return this.http.delete(environment.apiUrl + 'embarque/' + id) 
  }

  findOne(id: number){
    return this.http.get(environment.apiUrl + 'embarque/' + id)
  }
}
