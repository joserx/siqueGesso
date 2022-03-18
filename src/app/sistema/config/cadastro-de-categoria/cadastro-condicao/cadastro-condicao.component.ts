import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormArray,
  FormGroup,
  FormControlName,
} from '@angular/forms';
import { CondicoesPagamentoService } from 'src/app/services/condicoes-pagamento.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-condicao',
  templateUrl: './cadastro-condicao.component.html',
  styleUrls: ['./cadastro-condicao.component.scss'],
})
export class CadastroCondicaoComponent implements OnInit {
  condicaoForm = new FormGroup({
    nome: new FormControl(''),
  });

  constructor(
    private CondicoesPagamentoService: CondicoesPagamentoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  cancelar() {
    Swal.fire({
      title: 'Confirma o cancelamento?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate([
          'sistema',
          'configuracoes',
          'cadastro-de-categorias',
          'categoria-de-produto',
        ]);
        Swal.fire({
          title: '<h4>Categoria cancelada com sucesso!</h4>',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          width: '500px',
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: '<h4>Categoria não cancelada!</h4>',
          icon: 'info',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          width: '500px',
        });
      }
    });
  }

  submit(): any {
    this.CondicoesPagamentoService.create(this.condicaoForm.value).subscribe(
      () => {
        this.condicaoForm.reset();
        return Swal.fire({
          title: 'Condição salva!',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    );
  }
}
