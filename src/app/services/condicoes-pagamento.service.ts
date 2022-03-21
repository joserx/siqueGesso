import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CondicoesPagamentoService {
  constructor(private readonly http: HttpClient) {}
  public condicoes: any;

  findAll() {
    return this.http.get<any>(environment.apiUrl + 'condicoes-pagamento');
  }

  find() {
    return this.http.get(environment.apiUrl + 'condicoes-pagamento', {
      params: { status },
    });
  }


  create(data: any) {
    return this.http.post(environment.apiUrl + 'condicoes-pagamento/', data);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + 'condicoes-pagamento/' + id);
  }

  update(id: number, data: any) {
    return this.http.patch(
      environment.apiUrl + 'condicoes-pagamento/' + id,
      data
    );
  }
}
