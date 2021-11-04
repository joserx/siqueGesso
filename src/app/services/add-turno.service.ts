import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddTurnoService {

  constructor(
    private readonly http: HttpClient
  ) { }

  find(){
    return this.http.get(environment.apiUrl + 'add-turno')
  }

  create(data: any){
    return this.http.post(environment.apiUrl + 'add-turno/', data)
  }

  delete(id: number){
    return this.http.delete(environment.apiUrl + 'add-turno/' + id)
  }
}
