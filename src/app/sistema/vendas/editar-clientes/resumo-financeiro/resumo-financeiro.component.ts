import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-resumo-financeiro',
  templateUrl: './resumo-financeiro.component.html',
  styleUrls: ['./resumo-financeiro.component.scss'],
})
export class EditarResumoFinanceiroComponent implements OnInit {
  public pedidos: any[] = [];
  public id: number;

  constructor(
    private readonly pedidosService: PedidosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    this.pedidosService.findResumo(this.id).subscribe((res: any) => {
      console.log(res);
      this.pedidos = res;
    });
  }
}
