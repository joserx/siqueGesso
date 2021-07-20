import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema.service';

@Component({
  selector: 'app-criar-usuario-sistema',
  templateUrl: './criar-usuario-sistema.component.html',
  styleUrls: ['./criar-usuario-sistema.component.scss']
})
export class CriarUsuarioSistemaComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'surname': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
    'passwordRetype': new FormControl('', [Validators.required, Validators.minLength(8)]),
    'permission': new FormControl('', [Validators.required, Validators.min(0)])
  });
  avatarImg : any = 'assets/sem-foto.jpg';
  avatarFile : any = {};

  constructor(
    private readonly router: Router,
    private readonly usuarioSistemaService: UsuarioSistemaService,
    private readonly fileService : FileService
  ) { }

  ngOnInit(): void {
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
    if (this.password?.value != this.passwordRetype?.value) {
      this.userForm.get('passwordRetype')?.setErrors({ 'incorrect': true });
    } else {
      this.userForm.get('passwordRetype')?.setErrors(null);
    }
  }

  uploadImage(event: any) {

    let files: File[] = event.target.files;
    var reader : any = new FileReader();

    reader.onloadend = async () => {
      this.avatarImg = reader.result;
    }

    if (files[0]) {
      reader.readAsDataURL(files[0]);

      this.fileService.create(files[0]).subscribe((file : any) => {
        this.avatarFile = file;
      })

    } else {
      this.avatarImg = "assets/sem-foto.jpg";
      this.avatarFile = null;
    }

  }

  sendForm(data: any) {
    if (this.userForm.valid) {
      let { passwordRetype, ...user } = data
      if(this.avatarFile) {
        user.avatar = this.avatarFile.id;
      }
      this.usuarioSistemaService.create(user).subscribe((res: any) => {
        if (res.id) {
          this.router.navigate(['sistema', 'usuarios-sistema', 'listar'])
        }
      })
    }
  }

}
