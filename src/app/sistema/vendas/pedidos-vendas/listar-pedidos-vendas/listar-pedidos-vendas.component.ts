import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilialService } from 'src/app/services/filial.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PermissionsUsers } from 'src/app/services/permissions/permissions';

// Trocar para o body

@Component({
  selector: 'app-listar-pedidos-vendas',
  templateUrl: './listar-pedidos-vendas.component.html',
  styleUrls: ['./listar-pedidos-vendas.component.scss'],
})
export class ListarPedidosVendasComponent implements OnInit {
  public pedidosGerados: any[] = [];
  public pedidosAguardando: any[] = [];
  public pedidos: any[] = [];
  public pedidosBck: any[];
  public dataFinal: Date = new Date(Date.now());
  public dataInicio: Date = new Date(Date.now());
  public selectValue: string = 'vendedor';
  public pesquisa: any;
  public pages: any[] = [];
  public pagesNumber: number;
  public atualPageNumber: number = 0;
  public atualPage: any[] = [];

  create: boolean = false;

  constructor(
    private readonly pedidosService: PedidosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataInicio.setDate(this.dataInicio.getDate() - 300);
    this.dataFinal.setDate(this.dataFinal.getDate() + 300);

    if (
      !(
        (JSON.parse(localStorage.getItem('currentUser') as any).result
          .permission.permission &
          PermissionsUsers.vendas_ver) ==
        PermissionsUsers.vendas_ver
      )
    ) {
      this.router.navigate(['sistema']);
    }
    if (
      (JSON.parse(localStorage.getItem('currentUser') as any).result.permission
        .permission &
        PermissionsUsers.vendas_editar) ==
      PermissionsUsers.vendas_editar
    ) {
      this.create = true;
    }
    this.getPedidos().then(() => this.getPedidosPage());
  }

  getPedidos() {
    return new Promise((res, rej) => {
      this.pedidosService.find().subscribe(
        (data: any) => {

          this.pedidos = data;
          this.pedidosBck = data;
          for (let oneData of data) {
            if (oneData.status == 'Gerado' && oneData.tipoVenda == 0) {
              this.pedidosGerados.push(oneData);
            } else if (
              oneData.status == 'Aguardando aprovação' &&
              oneData.tipoVenda == 0
            ) {
              this.pedidosAguardando.push(oneData);
            }
          }
        },
        (err) => {
          rej(err);
        },
        () => {
          for (let control = 0; control <= this.pedidos.length; control++) {
            this.pedidosService
              .findByPage([control + '0'], {
                dataInicio: this.dataInicio,
                dataFinal: this.dataFinal,
              })
              .subscribe(
                (data: any) => {
                  if (data.length > 0) {
                    this.pages.push(data);
                  }
                },
                (err) => {
                  rej(err);
                },
                () => {
                  this.pagesNumber = Object.keys(this.pages).length;
                  res(true);
                }
              );
          }
        }
      );
    });
  }

  getPedidosPage() {
    return new Promise((res, rej) => {
      this.pedidosService
        .findByPage([0 + '0'], {
          dataInicio: this.dataInicio,
          dataFinal: this.dataFinal,
        })
        .subscribe((data: any) => {
          this.atualPage = data;
          res(data);
        });
    });
  }

  async pesquisar() {
    this.filtrarData();
    await this.getPedidos();
    await this.getPedidosPage();

    if (this.pesquisa && this.pesquisa.length) {
      const result = this.pedidosBck.filter((pedido) =>
        pedido[this.selectValue].includes(this.pesquisa)
      );
      this.atualPage = result;
    }
  }

  filterBeforeDate = '';
  filtrarData(){
    this.dataInicio = new Date(this.dataInicio);
    this.dataFinal = new Date(this.dataFinal);
    this.dataInicio.setDate(this.dataInicio.getDate() - 1);
    this.dataFinal.setDate(this.dataFinal.getDate());
  }

  totalPedidos(data: any) {
    let total = 0;
    for (let item of data) {
      total += Number(item.total);
    }
    return total;
  }

  proximo() {
    if (this.atualPageNumber < Object.keys(this.pages).length - 1) {
      this.atualPageNumber++;
      this.pedidosService
        .findByPage([this.atualPageNumber + '0'], {
          dataInicio: this.dataInicio,
          dataFinal: this.dataFinal,
        })
        .subscribe((data: any) => {
          this.atualPage = data;
        });
    }
  }
  anterior() {
    console.log(Object.keys(this.pages).length - 1);
    if (
      this.atualPageNumber <= Object.keys(this.pages).length - 1 &&
      this.atualPageNumber > 0
    ) {
      this.atualPageNumber--;
      this.pedidosService
        .findByPage([this.atualPageNumber + '0'], {
          dataInicio: this.dataInicio,
          dataFinal: this.dataFinal,
        })
        .subscribe((data: any) => {
          this.atualPage = data;
        });
    }
  }
}
