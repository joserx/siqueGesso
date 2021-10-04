import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(
    private readonly http: HttpClient
  ) { }

  find() {
    return this.http.get(environment.apiUrl + 'cargo/');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'cargo', data);
  }

  update(id : number, data : any) {
    return this.http.put(environment.apiUrl + 'cargo/' + id, data);
  }

  delete(id : number) {
    return this.http.delete(environment.apiUrl + 'cargo/' + id);
  }
}
