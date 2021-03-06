import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestinacaoVendaService } from 'src/app/services/destinacao-venda.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-destinacao-da-venda-lista',
  templateUrl: './destinacao-da-venda-lista.component.html',
  styleUrls: ['./destinacao-da-venda-lista.component.scss'],
})
export class DestinacaoDaVendaListaComponent implements OnInit {
  public destinacao: any;
  public destinacoes: any[] = [];
  public search: string = '';
  public destinacoesFiltradas: any[] = [];
  data: any = {};

  constructor(
    private DestinacaoVendaService: DestinacaoVendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDestinacoes();
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.config_ver) == PermissionsUsers.config_ver)){
      this.router.navigate(['sistema'])
    }
  }

  mudarStatus(destinacao: any) {
    if (destinacao.status == true) destinacao.status = false;
    else destinacao.status = true;
    this.DestinacaoVendaService.update(destinacao.id, destinacao).subscribe();
  }

  pesquisaDestinacao() {
    if (this.search.length > 0)
      this.destinacoesFiltradas = this.destinacoes.filter((destinacaoF: any) =>
        destinacaoF.nome.includes(this.search)
      );
    else this.destinacoesFiltradas = this.destinacao;
  }

  getDestinacoes(){
    this.DestinacaoVendaService.findAll().subscribe((res)=>{
      this.DestinacaoVendaService.destinacoes = res;
      this.destinacoes = res;
      this.destinacoesFiltradas = this.destinacoes;
    })
  }

  getDestinacoesF(status?: boolean) {
    this.DestinacaoVendaService.find(status).subscribe(
      (res: any) => {
        this.destinacoes = res;
      },
      (err) => {},
      () => {}
    );
  }

  deleteDestinacao(destinacao: any) {
    Swal.fire({
      title: `Deseja deletar ${destinacao.nome}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.DestinacaoVendaService.delete(destinacao.id).subscribe(() => {
          this.getDestinacoes();
          return Swal.fire({
            title: 'Destinacao Deletada!',
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
