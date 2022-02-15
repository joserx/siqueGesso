import { Component, OnInit, ViewChild } from '@angular/core';
import { ContasReceberService } from 'src/app/services/contas-receber.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas-a-receber',
  templateUrl: './contas-a-receber.component.html',
  styleUrls: ['./contas-a-receber.component.scss'],
})
export class ContasAReceberComponent implements OnInit {
  public contas: any = [];
  public conta: any;
  public contasFiltradas: any = []
  public search: string = '';

  constructor(private contasReceberService: ContasReceberService) {}

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
    this.contasReceberService.find().subscribe((res) => {
      this.contasReceberService.contas = res;
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
        this.contasReceberService.delete(conta.id).subscribe(() => {
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
