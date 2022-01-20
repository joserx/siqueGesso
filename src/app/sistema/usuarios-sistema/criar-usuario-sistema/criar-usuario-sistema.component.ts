import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema.service';
import { FilialService } from 'src/app/services/filial.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-criar-usuario-sistema',
  templateUrl: './criar-usuario-sistema.component.html',
  styleUrls: ['./criar-usuario-sistema.component.scss'],
})
export class CriarUsuarioSistemaComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    passwordRetype: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    permission: new FormControl('', [Validators.required, Validators.min(0)]),
    filial: new FormControl('', [Validators.required]),
  });
  avatarImg: any = 'assets/sem-foto.jpg';
  avatarFile: any = {};
  filiais: any[] = [];

  constructor(
    private readonly router: Router,
    private readonly usuarioSistemaService: UsuarioSistemaService,
    private readonly fileService: FileService,
    protected readonly filialService: FilialService
  ) {}

  ngOnInit(): void {
    this.updateFilial();
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
    return this.userForm.get('permission');
  }

  checkPasswords() {
    if (this.password?.value != this.passwordRetype?.value) {
      this.userForm.get('passwordRetype')?.setErrors({ incorrect: true });
    } else {
      this.userForm.get('passwordRetype')?.setErrors(null);
    }
  }

  uploadImage(event: any) {
    let files: File[] = event.target.files;
    var reader: any = new FileReader();

    reader.onloadend = async () => {
      this.avatarImg = reader.result;
    };

    if (files[0]) {
      reader.readAsDataURL(files[0]);

      this.fileService.create(files[0]).subscribe((file: any) => {
        this.avatarFile = file;
      });
    } else {
      this.avatarImg = 'assets/sem-foto.jpg';
      this.avatarFile = null;
    }
  }

  updateFilial() {
    this.filialService.find().subscribe((res: any) => {
      this.filiais = res;
    });
  }
  sendForm(data: any) {
    if (this.userForm.valid) {
      let { passwordRetype, ...user } = data;
      if (this.avatarFile) {
        user.avatar = this.avatarFile.id;
      }
      this.usuarioSistemaService.create(user).subscribe((res: any) => {
        if (res.id) {
          Swal.fire({
            title: 'Usuário criado com sucesso!',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          this.router.navigate(['sistema', 'usuarios-sistema', 'listar']);
        }
      });
    }
  }
}
