import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient) { }

  create(data: any){
    return this.http.post(environment.apiUrl + 'permissions', data)
  }

  find(){
    return this.http.get(environment.apiUrl + 'permissions')
  }

  delete(id: number){
    return this.http.delete(environment.apiUrl + 'permissions/' + id)
  }

}
