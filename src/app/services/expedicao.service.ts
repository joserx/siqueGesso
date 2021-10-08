import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedicaoService {

  constructor(
    private readonly http: HttpClient
  ) { }

  find() {
    return this.http.get(environment.apiUrl + 'expedicao/');
  }

  findOne(id: number){
    return this.http.get(environment.apiUrl + 'expedicao/' + id)
  }

  findByPage(no : any){
    return this.http.get(environment.apiUrl + 'expedicao/page/' + no)
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'expedicao', data);
  }

  update(id : number, data : any) {
    return this.http.patch(environment.apiUrl + 'expedicao/' + id, data);
  }

  delete(id : number) {
    return this.http.delete(environment.apiUrl + 'expedicao/' + id);
  }
}
