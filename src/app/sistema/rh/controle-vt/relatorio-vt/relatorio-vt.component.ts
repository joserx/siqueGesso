import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { RhService } from 'src/app/services/rh.service';
import { VtService } from 'src/app/services/vt.service';
@Component({
  selector: 'app-relatorio-vt',
  templateUrl: './relatorio-vt.component.html',
  styleUrls: ['./relatorio-vt.component.scss'],
})
export class RelatorioVtComponent implements OnInit {
  @ViewChild('content', { static: false }) el: ElementRef;
  colabOriginal: any[] = [];
  public colabAtivado: any[] = [];
  public colab: any[] = [];

  constructor(private vtService: VtService, private rhService: RhService) {}

  ngOnInit(): void {
    this.vtService.findAtivo().subscribe((data: any) => {
      for (let value in data) {
        if (data[value]['vt'] == 'Sim') {
          this.colabOriginal.push(data[value]);
          this.colab.push(data[value]);
        }
      }
      console.log(this.colabOriginal, this.colab);
      this.colabOriginal.sort((a: any, b: any) => {
        a.name = a.name.trim();
        b.name = b.name.trim();
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return -1;
      });
    });
  }

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
