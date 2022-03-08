import { Component, OnInit, ViewChild } from '@angular/core';
import { ContasReceberService } from 'src/app/services/contas-receber.service';
import {EditRecebimentoComponent} from './edit-recebimento/edit-recebimento.component'
import {ViewRecebimentoComponent} from './view-recebimento/view-recebimento.component'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas-a-receber',
  templateUrl: './contas-a-receber.component.html',
  styleUrls: ['./contas-a-receber.component.scss'],
})
export class ContasAReceberComponent implements OnInit {

  @ViewChild(EditRecebimentoComponent)
  editRecebimentosComponent: EditRecebimentoComponent;

  @ViewChild(ViewRecebimentoComponent)
  viewRecebimentosComponent: ViewRecebimentoComponent;

  public recebimentos: any = [];
  public recebimento: any;
  public recebimentosFiltrados: any = []
  public search: string = '';

  constructor(private contasReceberService: ContasReceberService) {}

  ngOnInit(): void {
    this.getRecebimentos();
  }

  pesquisaContas(){
    if (this.search.length > 0)
      this.recebimentosFiltrados = this.recebimentos.filter((contasF: any) =>
        contasF.id.includes(this.search)
      );
    else this.recebimentosFiltrados = this.recebimentos;
  }

  getRecebimentos(){
    this.contasReceberService.find().subscribe((res) => {
      this.contasReceberService.contas = res;
      this.recebimentos = res;
      this.recebimentosFiltrados = this.recebimentos;
      console.log(this.recebimentos);
    });
  }

  loadRecebimento(recebimentos:any){
    this.editRecebimentosComponent.loadForm(recebimentos)
  }

  loadViewRecebimento(recebimentos:any){
    this.viewRecebimentosComponent.loadForm(recebimentos)
  }

  delete(recebimento: any) {

    Swal.fire({
      title: `Deseja deletar ${recebimento.id}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.contasReceberService.delete(recebimento.id).subscribe(() => {
          this.getRecebimentos();
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
