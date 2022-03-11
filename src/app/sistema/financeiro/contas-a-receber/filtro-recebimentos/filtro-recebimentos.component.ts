import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ContasReceberService} from 'src/app/services/contas-receber.service'

import Swal from 'sweetalert2'
@Component({
  selector: 'app-filtro-recebimentos',
  templateUrl: './filtro-recebimentos.component.html',
  styleUrls: ['./filtro-recebimentos.component.scss']
})
export class FiltroRecebimentosComponent implements OnInit {
  public recebimentos: any = []
  public recebimento: any;
  public data: any = {};

  @Input() recebimentosOriginal: Array<any> = [];
  @Output() recebimentosFiltrados = new EventEmitter<any>();

  constructor(private contasReceberService: ContasReceberService) { }

  ngOnInit(): void {
    this.getRecebimentos();
  }

  getRecebimentos() {
    this.contasReceberService.find().subscribe((res) => {
      this.contasReceberService.contas = res;
      this.recebimentos = res;
    });
  }

  filtrarTipo(event: any) {
    const formaPagamento = event.target.value;
    if (formaPagamento) {
      this.recebimentos = this.recebimentosOriginal.filter(
        (recebimento) => recebimento.formaPagamento == formaPagamento
      );
    } else {
      this.recebimentos = this.recebimentosOriginal;
    }
  }

  filtrarUnidade(event: any) {
    const unidade = event.target.value;
    if (unidade) {
      this.recebimentos = this.recebimentosOriginal.filter(
        (recebimento) => recebimento.unidade == unidade
      );
    } else {
      this.recebimentos = this.recebimentosOriginal;
    }
  }

  deleteRecebimento(id: number) {
    Swal.fire({
      title: 'Você gostaria de deletar esse pagamento ?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Deletar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: '<h4>Pagamento Deletado!</h4>',
          icon: 'success',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          width: '500px',
        });
        this.contasReceberService.delete(id).subscribe((data: any) => {
          this.recebimentos = this.recebimentos.filter((ele: any) => {
            return ele.id != id;
          });
          this.contasReceberService.data().subscribe((data: any) => {
            this.data = data;
          });
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: '<h4>O pagamento não foi deletado!</h4>',
          icon: 'info',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          width: '500px',
        });
      }
    });
  }

}
