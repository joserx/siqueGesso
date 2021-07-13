import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema.service';


@Component({
  selector: 'app-editar-usuario-sistema',
  templateUrl: './editar-usuario-sistema.component.html',
  styleUrls: ['./editar-usuario-sistema.component.scss']
})
export class EditarUsuarioSistemaComponent implements OnInit {
  
  userId : number = 0;
  userForm : FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'surname': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
    'passwordRetype' : new FormControl('', [Validators.required, Validators.minLength(8)]),
    'permission': new FormControl('', [Validators.required, Validators.min(0)])
  });

  constructor(
    private readonly router : Router,
    private readonly route : ActivatedRoute,
    private readonly usuarioSistemaService : UsuarioSistemaService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.userId = Number(routeParams.get('id'));
    // GET USER BY ITS ID
    this.usuarioSistemaService.findOne(this.userId).subscribe((data : any) => {
      this.userForm.get('name')?.setValue(data.name)
      this.userForm.get('surname')?.setValue(data.surname)
      this.userForm.get('email')?.setValue(data.email)
    })
  }

  get name() {
    return this.userForm.get('name');
  }

  get surname() {
    return this.userForm.get('surname');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get passwordRetype() {
    return this.userForm.get('passwordRetype');
  }

  get permission() {
    return this.userForm.get('permission')
  }

  checkPasswords() {
    if(this.password?.value != this.passwordRetype?.value) {
      this.userForm.get('passwordRetype')?.setErrors({'incorrect': true});
    } else {
      this.userForm.get('passwordRetype')?.setErrors(null);
    }
  }

  sendForm(data : any) {
    if(this.userForm.valid) {
      let {passwordRetype, ...user} = data
      this.usuarioSistemaService.update(this.userId, user).subscribe((res : any) => {
        if(res.id) {
          this.router.navigate(['sistema', 'usuarios-sistema', 'listar'])
        }
      })
    }
  }

}
