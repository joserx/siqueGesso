import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(
    private readonly http: HttpClient
  ) { }

  find(){
    return this.http.get(environment.apiUrl + 'status/')
  }

  create(data: any){
    return this.http.post(environment.apiUrl + 'status/', data)
  }

  update(id: number, data: any){
    return this.http.patch(environment.apiUrl + 'status/' + id, data)
  }

  delete(id: number){
    return this.http.delete(environment.apiUrl + 'status/' + id)
  }

  findOne(id: number){
    return this.http.get(environment.apiUrl + 'status/' + id)
  }
}
