import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public connectPermission = new BehaviorSubject(false);
  private currentStatus = false;
  private lastStatus = false;

  constructor(
    private http: HttpClient,
    private readonly router : Router
  ) {
    console.log(String(localStorage.getItem("currentUser")))
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(String(localStorage.getItem("currentUser"))));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  valida() {
    return this.http.get<any>(`${environment.apiUrl}user/valida`);
  }

  checkPassword(data:any){
    return this.http.post<any>(environment.apiUrl + 'user/check', data)
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}user/login`, { email, password }).pipe(
      map(
        user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.router.navigate(['/sistema', 'home']);


          return user;
        }
      )
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  listenChange() {
    this.currentUserSubject.subscribe(
      data => {
        if (data) {
          this.currentStatus = true;
        } else {
          this.currentStatus = false;
        }

        if (this.lastStatus != this.currentStatus) {
          this.connectPermission.next(this.currentStatus);
          this.lastStatus = this.currentStatus;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}