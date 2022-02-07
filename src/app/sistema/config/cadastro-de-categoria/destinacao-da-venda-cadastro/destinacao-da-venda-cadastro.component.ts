import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormArray,
  FormGroup,
  FormControlName,
} from '@angular/forms';

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

  constructor(private DestinacaoVendaService: DestinacaoVendaService) {}

  ngOnInit(): void {}

  public status(): void {
    this.desativadoCheckbox === true
      ? (this.desativadoCheckbox = false)
      : (this.desativadoCheckbox = true);
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
