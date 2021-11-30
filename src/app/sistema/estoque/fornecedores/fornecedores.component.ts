import { Component, OnInit, ViewChild } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedores.service';
import Swal from 'sweetalert2';
import { EditFornecedorComponent } from './edit-fornecedor/edit-fornecedor.component';
import { ViewFornecedorComponent } from './view-fornecedor/view-fornecedor.component';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss'],
})
export class FornecedoresComponent implements OnInit {
  public fornecedores: any = [];

  @ViewChild(ViewFornecedorComponent)
  viewFornecedorCompenent: any;

  @ViewChild(EditFornecedorComponent)
  editFornecedorComponent: any;

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    this.getFornecedores();
  }

  getFornecedores() {
    this.fornecedorService.find().subscribe((res) => {
      this.fornecedorService.fornecedores = res;
      this.fornecedores = res;
    });
  }

  loadFornecedorView(fornecedor: any) {
    this.viewFornecedorCompenent.loadForm(fornecedor);
  }
  loadFornecedorEdit(fornecedor: any) {
    this.editFornecedorComponent.loadForm(fornecedor);
  }

  delete(fornecedor: any) {
    Swal.fire({
      title: `Deseja deletar ${fornecedor.fantasy_name}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.fornecedorService.delete(fornecedor.id).subscribe(() => {
          this.getFornecedores();
          return Swal.fire({
            title: 'Fornecedor deletado!',
            icon: 'success',
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        });
      else
        Swal.fire({
          title: 'Ação cancelada!',
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
