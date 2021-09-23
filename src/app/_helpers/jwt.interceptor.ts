import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //{ headers: new HttpHeaders({ 'notLoader': 'true' }) } -> esconde o loader da request
    if (!request.headers.get('notLoader'))
      this.showLoader();

    let httpOptions: any;
    let currentUser = this.authService.currentUserValue;
    try {
      httpOptions = {
        headers: new HttpHeaders({ Authorization: `Bearer ${currentUser.token}` }),
        observe: 'response'
      };
    } catch {}

    const newReq = request.clone(httpOptions);

    return next.handle(newReq).pipe(
      catchError(err => {
        switch (err.status){
          case 401: {
            this.authService.logout();
            return throwError(err);
          }
          case 0: {
            Swal.fire('Erro!', 'Sem conexão com a internet.', 'error');
            return EMPTY;
          }
        }
        Swal.fire('Erro!', err.error.msg || 'Houve um erro ao concluir essa ação.', 'error');
        return throwError(err);
      }),
      finalize(() => {
        this.hideLoader();
      })
    );
  }

  showLoader(): void {
    const load = document.querySelectorAll('.http-loading');
    load.forEach(t => t.classList.add('load-activ'));
  }
  hideLoader(): void {
    const load = document.querySelectorAll('.http-loading');
    load.forEach(t => t.classList.remove('load-activ'));
  }
}