import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NconfromService {

  constructor(
    private readonly http: HttpClient
  ) { }

    find(){
      return this.http.get(environment.apiUrl + 'nconfrom/')
    }

    create(data: any){
      return this.http.post(environment.apiUrl + 'nconfrom/', data)
    }

    update(id: number, data: any){
      return this.http.patch(environment.apiUrl + 'nconfrom/' + id, data)
    }

    delete(id: number){
      return this.http.delete(environment.apiUrl + 'nconfrom/' + id)
    }

    findOne(id: number){
      return this.http.get(environment.apiUrl + 'nconfrom/' + id)
    }
}
