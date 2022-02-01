import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nova-msg',
  templateUrl: './nova-msg.component.html',
  styleUrls: ['./nova-msg.component.scss'],
})
export class NovaMsgComponent implements OnInit {
  enviadoPor: number;

  novaMsg: FormGroup = new FormGroup({
    titulo: new FormControl(''),
    usuario: new FormControl(null),
    texto: new FormControl(''),
  });

  paraTodos: boolean = false;
  usuarios: any[] = [];

  constructor(
    private readonly usuarioSistemasService: UsuarioSistemaService,
    private readonly MensagemService: MensagemService
  ) {}

  ngOnInit(): void {
    this.usuarioSistemasService.find().subscribe((data: any) => {
      this.usuarios = data;
    });
  }

  submit(): any {
    let data: any = {
      ...this.novaMsg.value,
      ...{ enviadoPor: this.enviadoPor },
    };

    if (this.paraTodos) {
      data.paraId = null;
    }
  }
}
