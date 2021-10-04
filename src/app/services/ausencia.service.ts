import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AusenciaService {

  constructor(
    private readonly http: HttpClient
  ) { }

  find() {
    return this.http.get(environment.apiUrl + 'ausencia/');
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'ausencia', data);
  }

  update(id : number, data : any) {
    return this.http.put(environment.apiUrl + 'ausencia/' + id, data);
  }

  delete(id : number) {
    return this.http.delete(environment.apiUrl + 'ausencia/' + id);
  }
}
