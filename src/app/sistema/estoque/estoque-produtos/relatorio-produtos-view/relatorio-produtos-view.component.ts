import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProdutoService } from '../../../../services/produto.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-relatorio-produtos-view',
  templateUrl: './relatorio-produtos-view.component.html',
  styleUrls: ['./relatorio-produtos-view.component.scss'],
})
export class RelatorioProdutosViewComponent implements OnInit {
  @ViewChild('content', { static: false }) el: ElementRef;
  public estoqueOriginal: any[] = [];
  public estoqueAtivado: any[] = [];
  public estoque: any[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.find().subscribe((data: any) => {
      for (let value of data) {
        if (value['itens'] == '1') {
          this.estoqueOriginal.push(value);
          this.estoque.push(value);
        }
      }
    });
  }

  savePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('relatorio-produtos.pdf');
      },
    });
  }
}
