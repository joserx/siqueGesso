import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private readonly http : HttpClient
  ) { }

  find() {
    return this.http.get(environment.apiUrl + 'file/');
  }

  findOne(id : number) {
    return this.http.get(environment.apiUrl + 'file/' + id);
  }

  create(file : File, nome?: string) {
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);
    if (nome) formData.append('nome', nome)

    return this.http.post(`${environment.apiUrl}file/upload`, formData);
  }

  update(id : number, data : any) {
    return this.http.put(environment.apiUrl + 'file/' + id, data);
  }

  delete(id : number) {
    return this.http.delete(environment.apiUrl + 'file/' + id);
  }
  
}
