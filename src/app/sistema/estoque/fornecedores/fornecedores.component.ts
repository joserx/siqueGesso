import { Component, OnInit, ViewChild } from '@angular/core';
import { FornecedorService } from 'src/app/services/fornecedores.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
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
  public fornecedoresFiltrados: any = [];
  public search: string = '';
  create: boolean = false
  del: boolean = false

  @ViewChild(ViewFornecedorComponent)
  viewFornecedorComponent: any;

  @ViewChild(EditFornecedorComponent)
  editFornecedorComponent: any;

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.estoque_excluir) == PermissionsUsers.estoque_excluir){
      this.del = true
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.estoque_editar) == PermissionsUsers.estoque_editar){
      this.create = true
    }
    this.getFornecedores();
  }
  pesquisaFornecedores() {
    if (this.search.length > 0)
      this.fornecedoresFiltrados = this.fornecedores.filter((fornecedor: any) =>
        fornecedor.fantasy_name.includes(this.search)
      );
    else this.fornecedoresFiltrados = this.fornecedores;
  }

  getFornecedores() {
    this.fornecedorService.find().subscribe((res) => {
      this.fornecedorService.fornecedores = res;
      this.fornecedores = res;
      this.fornecedoresFiltrados = this.fornecedores;
    });
  }

  loadFornecedorView(fornecedor: any) {
    this.viewFornecedorComponent.loadForm(fornecedor);
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
          title: 'A????o cancelada!',
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
