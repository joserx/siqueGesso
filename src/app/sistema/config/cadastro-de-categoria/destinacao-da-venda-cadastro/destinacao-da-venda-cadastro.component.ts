import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormArray,
  FormGroup,
  FormControlName,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import Swal from 'sweetalert2';

import { DestinacaoVendaService } from 'src/app/services/destinacao-venda.service';
@Component({
  selector: 'app-destinacao-da-venda-cadastro',
  templateUrl: './destinacao-da-venda-cadastro.component.html',
  styleUrls: ['./destinacao-da-venda-cadastro.component.scss'],
})
export class DestinacaoDaVendaCadastroComponent implements OnInit {
  destinacaoForm = new FormGroup({
    nome: new FormControl(''),
    status: new FormControl(''),
  });
  public desativadoCheckbox: boolean = false;

  constructor(private DestinacaoVendaService: DestinacaoVendaService,
    private readonly router: Router,) {}

  ngOnInit(): void {}

  public status(): void {
    this.desativadoCheckbox === true
      ? (this.desativadoCheckbox = false)
      : (this.desativadoCheckbox = true);
  }


  cancelar(){

    Swal.fire({
      title: 'Confirma o cancelamento?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['sistema', 'configuracoes', 'cadastro-de-categorias', 'destinacao-de-venda'])
        Swal.fire({
          title: '<h4>Destinacao cancelada com sucesso!</h4>',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          width: '500px'
        })
      } else if (result.isDenied) {
        Swal.fire({
          title: '<h4>Destinacao não cancelada!</h4>',
          icon: 'info',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true ,
          width: '500px'
        })
      }
    })

  }

  submit(): any {
    this.DestinacaoVendaService.create(this.destinacaoForm.value).subscribe(
      () => {
        // this.reload.emit();
        // this.closeBtn.nativeElement.click();
        this.destinacaoForm.reset();
        return Swal.fire({
          title: 'Destinacao Salva!',
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
