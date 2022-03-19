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
  public pages: any[] = [];
  public pagesNumber: number;
  public atualPageNumber: number = 0;
  public atualPage: any[] = [];
  create: boolean = false

  constructor(
    private readonly pedidosService: PedidosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(!((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_ver) == PermissionsUsers.vendas_ver)){
      this.router.navigate(['sistema'])
    }
    if((JSON.parse(localStorage.getItem('currentUser') as any).result.permission.permission & PermissionsUsers.vendas_editar) == PermissionsUsers.vendas_editar){
      this.create = true
    }
    this.pedidosService.find().subscribe(
      (data: any) => {
        this.pedidos = data;
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
        console.log(data);
      },
      (err) => {
        console.log(err);
      },
      () => {
        for (let control = 0; control <= this.pedidos.length; control++) {
          this.pedidosService.findByPage([control + '0']).subscribe(
            (data: any) => {
              if (data.length > 0) {
                this.pages.push(data);
              }
            },
            (err) => {
              console.log(err);
            },
            () => {
              this.pagesNumber = Object.keys(this.pages).length;
            }
          );
        }
      }
    );
    this.pedidosService.findByPage([0 + '0']).subscribe((data: any) => {
      this.atualPage = data;
      console.log('atualPage', data);
    });
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
        .findByPage([this.atualPageNumber + '0'])
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
        .findByPage([this.atualPageNumber + '0'])
        .subscribe((data: any) => {
          this.atualPage = data;
        });
    }
  }
}
