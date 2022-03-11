import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContasPagarService } from 'src/app/services/contas-pagar.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-filtro-pagar',
  templateUrl: './filtro-pagar.component.html',
  styleUrls: ['./filtro-pagar.component.scss'],
})
export class FiltroPagarComponent implements OnInit {
  public contas: any = []
  public conta: any;
  public data: any = {};



  @Input() contasOriginal: Array<any> = [];
  @Output() contasFiltradas = new EventEmitter<any>();

  constructor(private contasPagarService: ContasPagarService) {}

  ngOnInit(): void {
    this.getContas();
  }

  getContas() {
    this.contasPagarService.find().subscribe((res) => {
      this.contasPagarService.contas = res;
      this.contas = res;
    });
  }

  filtrarTipo(event: any) {
    const formaPagamento = event.target.value;
    if (formaPagamento) {
      this.contas = this.contasOriginal.filter(
        (conta) => conta.formaPagamento == formaPagamento
      );
    } else {
      this.contas = this.contasOriginal;
    }
  }

  filtrarUnidade(event: any) {
    const unidade = event.target.value;
    if (unidade) {
      this.contas = this.contasOriginal.filter(
        (conta) => conta.unidade == unidade
      );
    } else {
      this.contas = this.contasOriginal;
    }
  }

  deletePagamento(id: number) {
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
        this.contasPagarService.delete(id).subscribe((data: any) => {
          this.contas = this.contas.filter((ele: any) => {
            return ele.id != id;
          });
          this.contasPagarService.data().subscribe((data: any) => {
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
