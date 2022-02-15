import { Component, OnInit } from '@angular/core';
import {ContasPagarService} from 'src/app/services/contas-pagar.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas-a-pagar',
  templateUrl: './contas-a-pagar.component.html',
  styleUrls: ['./contas-a-pagar.component.scss']
})
export class ContasAPagarComponent implements OnInit {
  public contas: any = []
  public conta: any;
  public contasFiltradas: any = []
  public search: string = '';

  constructor(private contasPagarService: ContasPagarService) {}

  ngOnInit(): void {
    this.getContas();
  }

  pesquisaContas(){
    if (this.search.length > 0)
      this.contasFiltradas = this.contas.filter((contasF: any) =>
        contasF.id.includes(this.search)
      );
    else this.contasFiltradas = this.contas;
  }

  getContas(){
    this.contasPagarService.find().subscribe((res) => {
      this.contasPagarService.contas = res;
      this.contas = res;
      this.contasFiltradas = this.contas;
      console.log(this.contas);
    });
  }

  delete(conta: any) {
    console.log(conta);

    Swal.fire({
      title: `Deseja deletar ${conta.id}?`,
      icon: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((res) => {
      if (res.isConfirmed)
        this.contasPagarService.delete(conta.id).subscribe(() => {
          this.getContas();
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
