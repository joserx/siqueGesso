import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormArray,
  FormGroup,
  FormControlName,
} from '@angular/forms';

import Swal from 'sweetalert2';

import {CategoriaFornecedorService} from 'src/app/services/categoria-fornecedor.service'

@Component({
  selector: 'app-cadastro-cat-fornecedor',
  templateUrl: './cadastro-cat-fornecedor.component.html',
  styleUrls: ['./cadastro-cat-fornecedor.component.scss']
})
export class CadastroCatFornecedorComponent implements OnInit {
  categoriaForm = new FormGroup({
    nome: new FormControl(''),
    status: new FormControl(''),
  });
  public desativadoCheckbox: boolean = false;


  constructor(private CategoriaFornecedorService: CategoriaFornecedorService) { }

  ngOnInit(): void {}

  public status(): void {
    this.desativadoCheckbox === true
      ? (this.desativadoCheckbox = false)
      : (this.desativadoCheckbox = true);
  }

  submit(): any {
    this.CategoriaFornecedorService.create(this.categoriaForm.value).subscribe(
      () => {
        this.categoriaForm.reset();
        return Swal.fire({
          title: 'Categoria salva!',
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
