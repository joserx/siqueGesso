import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
      label: 'Lorem Ipsum',
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
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ];
  lineChartLabels: Array<any> = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
  ];
  lineChartOptions: any = {
    responsive: true,
  };
  lineChartLegend = true;
  lineChartType: any = 'line';
  inlinePlugin: any;
  textPlugin: any;

  constructor() {}

  ngOnInit(): void {
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
