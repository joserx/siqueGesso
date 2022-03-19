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

import {CategoriaFornecedorService} from 'src/app/services/categoria-fornecedor.service'
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

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


  constructor(
    private CategoriaFornecedorService: CategoriaFornecedorService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.config_ver) == PermissionsUsers.config_ver)){
      this.router.navigate(['sistema'])
    }
  }

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
        this.router.navigate(['sistema', 'configuracoes', 'cadastro-de-categorias', 'categoria-fornecedor'])
        Swal.fire({
          title: '<h4>Categoria cancelada com sucesso!</h4>',
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
          title: '<h4>Categoria não cancelada!</h4>',
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
