import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VtService {
  constructor(private readonly http: HttpClient) {}

  find() {
    return this.http.get(environment.apiUrl + 'vt/');
  }

  findAtivo() {
    return this.http.get(environment.apiUrl + 'vt/ativo');
  }

  findOne(id: number) {
    return this.http.get(environment.apiUrl + 'vt/' + id);
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'vt', data);
  }

  update(data: any) {
    return this.http.patch(environment.apiUrl + 'vt', data);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + 'vt/' + id);
  }
}
