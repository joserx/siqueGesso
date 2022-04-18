import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-pedidos-realizados',
  templateUrl: './pedidos-realizados.component.html',
  styleUrls: ['./pedidos-realizados.component.scss']
})
export class PedidosRealizadosComponent implements OnInit {
  public pedidos: any[] = [];
  public id: number;
  public anos: any = [ 2015, 2016, 2017, 2018, 2019, 2020, 2021 ]

  constructor(
    private readonly pedidosService: PedidosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    this.pedidosService.findResumo(this.id).subscribe((res: any) => {
      console.log(res);
      this.pedidos = res;
    });
  }

}
