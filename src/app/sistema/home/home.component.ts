import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FilialService } from 'src/app/services/filial.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  banner: string = '';
  valoresMensais: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


  public cards = [
    { nome: 'Vendas', icon: 'bi-shop', href: '/sistema/vendas' },
    { nome: 'Compras', icon: 'bi-cart4', href: '/sistema/compras' },
    { nome: 'Estoque', icon: 'bi-box-seam', href: '/sistema/estoque' },
    {
      nome: 'Financeiro',
      icon: 'bi-file-earmark-bar-graph',
      href: '/sistema/financeiro',
    },
    { nome: 'Expedição', icon: 'bi-truck', href: '/sistema/expedicao' },
    { nome: 'RH', icon: 'bi-person-lines-fill', href: '/sistema/rh' },
  ];

  //chart
  lineChartData: Chart.ChartDataSets[] = [
    {
      label: 'Quantidade de vendas',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: this.valoresMensais,
    },
  ];

  lineChartLabels: Array<any> = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  lineChartOptions: any = {
    responsive: true,
  };
  lineChartLegend = true;

  lineChartType: any = 'bar';
  inlinePlugin: any;
  textPlugin: any;

  constructor(
    private filialService: FilialService,
    private pedidosService: PedidosService
  ) { }


  ngOnInit(): void {
    // Banner da filial
    const storage = JSON.parse(String(localStorage.getItem('currentUser')));
    this.filialService.findOne(Number(storage.result.lojaId)).subscribe((res: any) => {
      if (res != null && res.banner != null) {
        this.banner = environment.apiUrl + 'file/download/' + res.banner.fileName;
      } else {
        this.banner = './assets/banner.png';
      }
    });

    this.pedidosService.find().subscribe((res: any) => {
      res.map((item: any) => {
        const esteAno = new Date().getFullYear();
        if (esteAno == new Date(item.created_at).getFullYear()) {
          const data = new Date(item.created_at).getMonth();
          this.valoresMensais[data] += Number(item.total);
        }
        this.lineChartType = 'line'
      })
    })

    //chart

    this.textPlugin = [
      {
        id: 'textPlugin',
        beforeDraw(chart: any): any {
          const width = chart.chart.width;
          const height = chart.chart.height;
          const ctx = chart.chart.ctx;
          ctx.restore();
          const fontSize = (height / 114).toFixed(2);
          ctx.font = `${fontSize}em sans-serif`;
          ctx.textBaseline = 'middle';
          const text = '';
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      },
    ];

    this.inlinePlugin = this.textPlugin;
  }

}
