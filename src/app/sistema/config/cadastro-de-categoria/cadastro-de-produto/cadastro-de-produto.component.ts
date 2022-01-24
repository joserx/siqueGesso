import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormArray,
  FormGroup,
  FormControlName,
} from '@angular/forms';

import Swal from 'sweetalert2';

import { CategoriaProdutoService } from 'src/app/services/categoria-produto.service';

@Component({
  selector: 'app-cadastro-de-produto',
  templateUrl: './cadastro-de-produto.component.html',
  styleUrls: ['./cadastro-de-produto.component.scss'],
})
export class CadastroDeProdutoComponent implements OnInit {
  categoriaForm = new FormGroup({
    nome: new FormControl(''),
  });

  constructor(private CategoriaProdutoService: CategoriaProdutoService) {}

  ngOnInit(): void {}

  submit(): any {
    this.CategoriaProdutoService.create(this.categoriaForm.value).subscribe(
      () => {
        // this.reload.emit();
        // this.closeBtn.nativeElement.click();
        this.categoriaForm.reset();
        return Swal.fire({
          title: 'Produto salvo!',
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
