import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilialService {

  constructor(
    private readonly http: HttpClient
  ) { }

  find() {
    return this.http.get(environment.apiUrl + 'filial/');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'filial', data);
  }

  update(id : number, data : any) {
    return this.http.put(environment.apiUrl + 'filial/' + id, data);
  }

  delete(id : number) {
    return this.http.delete(environment.apiUrl + 'filial/' + id);
  }
}
