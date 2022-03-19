import { Component, OnInit, ViewChild } from '@angular/core';
import { SuprimentoService } from 'src/app/services/suprimentos.service';
import { EditSuprimentoComponent } from './edit-suprimento/edit-suprimento.component';
import { ViewSuprimentoComponent } from './view-suprimento/view-suprimento.component';
import Swal from 'sweetalert2';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

@Component({
  selector: 'app-suprimentos',
  templateUrl: './suprimentos.component.html',
  styleUrls: ['./suprimentos.component.scss'],
})
export class SuprimentosComponent implements OnInit {
  @ViewChild(ViewSuprimentoComponent)
  viewSuprimentoComponent: ViewSuprimentoComponent;

  @ViewChild(EditSuprimentoComponent)
  editSuprimentoComponent: EditSuprimentoComponent;

  public suprimentos: any = [];
  public suprimento: any;
  public suprimentosFiltrados: any = [];
  public search: string = '';
  create: boolean = false
  del: boolean = false

  constructor(private suprimentoService: SuprimentoService) {}

  ngOnInit(): void {
    this.getSuprimentos();
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.estoque_excluir) == PermissionsUsers.estoque_excluir){
      this.del = true
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.estoque_editar) == PermissionsUsers.estoque_editar){
      this.create = true
    }
  }

  pesquisaSuprimentos() {
    if (this.search.length > 0)
      this.suprimentosFiltrados = this.suprimentos.filter((suprimentoF: any) =>
        suprimentoF.nome.includes(this.search)
      );
    else this.suprimentosFiltrados = this.suprimentos;
  }

  getSuprimentos() {
    this.suprimentoService.find().subscribe((res) => {
      this.suprimentoService.suprimentos = res;
      this.suprimentos = res;
      this.suprimentosFiltrados = this.suprimentos;
    });
  }

  loadSuprimentoView(suprimento: any) {
    this.viewSuprimentoComponent.loadForm(suprimento);
  }
  loadSuprimentoEdit(suprimento: any) {
    this.editSuprimentoComponent.loadForm(suprimento);
  }

  delete(suprimento: any) {
    Swal.fire({
      title: `Deseja deletar ${suprimento.nome}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.suprimentoService.delete(suprimento.id).subscribe(() => {
          this.getSuprimentos();
          return Swal.fire({
            title: 'Produto Deletado!',
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
