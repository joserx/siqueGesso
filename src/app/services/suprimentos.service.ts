import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SuprimentoService {
  suprimentos: any[];

  constructor(private readonly http: HttpClient) {}

  find() {
    return this.http.get<any>(environment.apiUrl + 'suprimentos');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'suprimentos', data);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}suprimentos/${id}`);
  }

  update(id: number, data: any) {
    return this.http.patch(environment.apiUrl + 'suprimentos/' + id, data);
  }
}
