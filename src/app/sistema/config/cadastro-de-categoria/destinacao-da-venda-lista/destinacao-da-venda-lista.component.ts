import { Component, OnInit } from '@angular/core';
import { DestinacaoVendaService } from 'src/app/services/destinacao-venda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-destinacao-da-venda-lista',
  templateUrl: './destinacao-da-venda-lista.component.html',
  styleUrls: ['./destinacao-da-venda-lista.component.scss'],
})
export class DestinacaoDaVendaListaComponent implements OnInit {
  public destinacao: any;
  public destinacoes: any;
  public search: string = '';
  public destinacoesFiltradas: any = [];

  constructor(private DestinacaoVendaService: DestinacaoVendaService) {}

  ngOnInit(): void {
    this.getDestinacao();
  }

  pesquisaDestinacao() {
    if (this.search.length > 0)
      this.destinacoesFiltradas = this.destinacoes.filter((categoriaF: any) =>
        categoriaF.nome.includes(this.search)
      );
    else this.destinacoesFiltradas = this.destinacao;
  }

  getDestinacao() {
    this.DestinacaoVendaService.find().subscribe((res) => {
      this.DestinacaoVendaService.destinacoes = res;
      this.destinacoes = res;
      this.destinacoesFiltradas = this.destinacoes;
      console.log(res);
    });
  }

  deleteDestinacao(categoria: any) {
    Swal.fire({
      title: `Deseja deletar ${categoria.nome}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.DestinacaoVendaService.delete(categoria.id).subscribe(() => {
          this.getDestinacao();
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
