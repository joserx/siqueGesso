import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RhService {
  constructor(private readonly http: HttpClient) {}

  find(disabled: any = false) {
    return this.http.get(environment.apiUrl + 'rh/', { params: { disabled } });
  }

  findOne(id: number) {
    return this.http.get(environment.apiUrl + 'rh/' + id);
  }

  findByPage(no: number) {
    return this.http.get(environment.apiUrl + 'rh/page/' + no);
  }

  data() {
    return this.http.get(environment.apiUrl + 'rh/data');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'rh', data);
  }

  update(id: number, data: any) {
    return this.http.put(environment.apiUrl + 'rh/' + id, data);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + 'rh/' + id);
  }
}
