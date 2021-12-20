import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-relatorio-produtos-view',
  templateUrl: './relatorio-produtos-view.component.html',
  styleUrls: ['./relatorio-produtos-view.component.scss'],
})
export class RelatorioProdutosViewComponent implements OnInit {
  @ViewChild('content', { static: false }) el: ElementRef;
  estoqueOriginal: any[] = [];
  public estoqueAtivado: any[] = [];
  public estoque: any[] = [];

  constructor() {}

  ngOnInit(): void {}
  savePdf() {
    // const doc = new jsPDF();
    // doc.text("Hello world!", 10, 10);
    // doc.save("relatorio-faltas.pdf");

    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('relatorio-faltas.pdf');
      },
    });
  }
}
