import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class CategoriaFornecedorService {
  constructor(private readonly http: HttpClient) {}
  public categorias: any;

  findAll() {
    return this.http.get<any>(environment.apiUrl + 'categoria-fornecedor');
  }

  find(status: any = true) {
    return this.http.get(environment.apiUrl + 'categoria-fornecedor', {
      params: { status },
    });
  }

  create(data: any) {
    return this.http.post(environment.apiUrl + 'categoria-fornecedor/', data);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + 'categoria-fornecedor/' + id);
  }

  update(id: number, data: any) {
    return this.http.patch(
      environment.apiUrl + 'categoria-fornecedor/' + id,
      data
    );
  }
}
