import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  })

  constructor(
    private readonly authService : AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }
  
  get password() {
    return this.loginForm.get('password');
  }

  notFound : boolean = false;

  login(data : any) {
    if(this.loginForm.valid) {
      this.authService.login(data.email, data.password).subscribe((res) => {
        
      }, (err) => {
        if(err) {
          this.notFound = true;
        }
      })
    }
  }

}
