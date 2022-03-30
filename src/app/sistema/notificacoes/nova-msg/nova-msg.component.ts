import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
    titulo: new FormControl('', Validators.required),
    usuario: new FormControl(null),
    texto: new FormControl(''),
  });

  @ViewChild('closeModal') closeModal: ElementRef;

  paraTodos: boolean = false;
  usuarios: any[] = [];

  constructor(
    private readonly usuarioSistemasService: UsuarioSistemaService,
    private readonly MensagemService: MensagemService
  ) {}

  ngOnInit(): void {
    this.MensagemService.listen('message').subscribe(() => {});
    this.usuarioSistemasService.find().subscribe((data: any) => {
      this.usuarios = data;
    });
  }

  submit(): any {
    console.log(this.novaMsg.value);

    let data: any = {
      ...this.novaMsg.value,
      ...{ enviadoPor: this.enviadoPor },
    };

    if (this.paraTodos) {
      data.paraId = null;
    }

    this.MensagemService.emit('message', data);

    this.MensagemService.create(this.novaMsg.value).subscribe(() => {
      return Swal.fire({
        title: 'Mensagem Enviada!',
        icon: 'success',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    });
  }
}
