import { Component, OnInit } from '@angular/core';
import {CondicoesPagamentoService} from 'src/app/services/condicoes-pagamento.service'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-condicoes-pagamento',
  templateUrl: './condicoes-pagamento.component.html',
  styleUrls: ['./condicoes-pagamento.component.scss']
})
export class CondicoesPagamentoComponent implements OnInit {
  public condicao: any;
  public condicoes: any[] = [];
  public search: string = '';
  public condicoesFiltradas: any[] = [];
  data: any = {};

  constructor(private CondicoesPagamentoService: CondicoesPagamentoService) { }

  ngOnInit(): void {
    this.getCondicoes();
  }

  pesquisaCondicao() {
    if (this.search.length > 0)
      this.condicoesFiltradas = this.condicoes.filter((categoriaF: any) =>
        categoriaF.nome.includes(this.search)
      );
    else this.condicoesFiltradas = this.condicao;
  }

  getCondicoes(){
    this.CondicoesPagamentoService.findAll().subscribe((res)=>{
      this.CondicoesPagamentoService.condicoes = res;
      this.condicoes = res;
      this.condicoesFiltradas = this.condicoes;
    })
  }

  deleteCondicao(condicao: any) {
    Swal.fire({
      title: `Deseja deletar ${condicao.nome}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.CondicoesPagamentoService.delete(condicao.id).subscribe(() => {
          this.getCondicoes();
          return Swal.fire({
            title: 'Categoria Deletada!',
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
